import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { v4 as uuid } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import {
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import FormTreeService from "../../../services/formTree";
import Toolbox from "./ToolBox";
import Toolbox2 from "./ToolBox2";
import DropZone from "./DropZone";
import ITEMS from "./Items";
import ITEMS2 from "./Items2";
import FormGenerateDemo from "../FormPreview/FormPreview";
import useToast from "../../../hooks/useToast";

function FormBuilder() {
  const [items, setItems] = useState([]);
  const [formName, setFormName] = useState("");
  const [parentId, setParentId] = useState("");
  const [label, setLabel] = useState("");
  const [code, setCode] = useState("");
  const [visibleFormPreview, setVisibleFormPreview] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation(["common"]);

  useLayoutEffect(() => {
    setFormName(searchParams.get("name"));
    setParentId(searchParams.get("id"));
    setLabel(searchParams.get("label"));
    setCode(searchParams.get("code"));
  }, []);

  useEffect(() => {
    if (code !== "") {
      let params = {};

      params = {
        label: ["Tasks"],
        code: code,
      };
      FormTreeService.findProperties(params)
        .then((res) => {
          console.log(res.data);
          const convertedData = res.data.type.children.map(function (item) {
            return {
              ...item,
              type: item.inputType,
              rules: { required: item.rules[0] },
              options: item.options.map(function (option) {
                return { optionsName: option };
              }),
            };
          });
          console.log(convertedData);
          setItems(convertedData);
        })
        .catch((err) => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: err.response ? err.response.data.message : err.message,
            life: 2000,
          });
        });
    }
  }, [code]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const copy = (
    source,
    destination,
    droppableSource,
    droppableDestination,
    isBase
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    if (isBase) {
      destClone.splice(droppableDestination.index, 0, {
        type: item.type,
        label: "",
        defaultValue: "",
        rules: { required: false },
        // rules: [false],
        tag: ["deneme"],
        typeId: uuid(),
        key: uuid(),
        labelclass: "TypeProperty",
        options: [],
        isActive: true,
        placeholder: "",
        label2: "",
        index: "",
        description: "",
        otherDataSource: "",
      });
    } else {
      console.log("Droppable dest ", droppableDestination);
    }
    return destClone;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    switch (source.droppableId) {
      case destination.droppableId:
        setItems((prevValue) =>
          reorder(prevValue, source.index, destination.index)
        );
        break;
      case "Toolbox":
        setItems(copy(ITEMS, items, source, destination, true));
        break;
      case "Toolbox2":
        setItems(copy(ITEMS2, items, source, destination, true));
        break;
      default:
        break;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid">
        <div className="col-2">
          <Toolbox />
        </div>
        <div className="col-2">
          <Toolbox2 />
        </div>
        <div className="col-7">
          <div className="field">
            <h5 className="block">Form Name : {formName} </h5>
            <div className="flex justify-content-between">
              <div>
                <Button
                  className="p-button-warning"
                  label="Form Preview"
                  icon="pi pi-book"
                  onClick={() => setVisibleFormPreview(true)}
                />
              </div>
              <div>
                <Button
                  onClick={() => {
                    const data = items;
                    console.log(data);
                    // console.log(dataNeo4j);
                    const dataNeo4j = data.map((item) => {
                      return {
                        identifierLabelDto: {
                          identifier: parentId,
                          label: [label],
                        },
                        label: item.label,
                        variableDataType: "string",
                        inputType: item.type,
                        otherDataSource: item.otherDataSource,
                        tag: item.tag,
                        defaultValue: item.defaultValue,
                        rules: [item.rules.required],
                        options: item.options?.map(
                          (option) => option.optionsName
                        ),
                        // isActive: item.isActive,
                        placeholder: item.placeholder,
                        label2: item.label2,
                        index: item.index,
                        description: item.description,
                      };
                    });
                    console.log(dataNeo4j);
                    //array'de tekrar eden elaman varsa true dönüyor
                    function hasDuplicates(array) {
                      return new Set(array).size !== array.length;
                    }
                    //property label girili değilse uyarı ver
                    if (dataNeo4j.map((item) => item.label).includes("")) {
                      toast.current.show({
                        severity: "error",
                        summary: "Error Message",
                        detail: "Please fill all the property labels",
                        life: 4000,
                      });
                    } else {
                      //aynı isimde property label varsa uyarı ver
                      if (
                        hasDuplicates(dataNeo4j.map((item) => item.label)) ===
                        true
                      ) {
                        toast.current.show({
                          severity: "error",
                          summary: "Error Message",
                          detail: "Please fill different property labels",
                          life: 4000,
                        });
                      } else {
                        if (dataNeo4j.length > 0) {
                          FormTreeService.createProperty(dataNeo4j)
                            .then((res) => {
                              toast.current.show({
                                severity: "success",
                                summary: t("Successful"),
                                detail: t("Form Properties Created"),
                                life: 3000,
                              });
                              navigate("/formtree");
                            })
                            .catch((err) => {
                              toast.current.show({
                                severity: "error",
                                summary: "Error",
                                detail: err.response
                                  ? err.response.data.message
                                  : err.message,
                                life: 2000,
                              });
                            });
                        }
                      }
                    }
                  }}
                >
                  Save
                </Button>
                <Button
                  className="p-button-danger ml-2"
                  onClick={() => {
                    navigate("/formtree");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
          <Card>
            <DropZone droppableId="form" items={items} setItems={setItems} />
          </Card>
        </div>

        <Dialog
          header={formName}
          visible={visibleFormPreview}
          onHide={() => setVisibleFormPreview(false)}
          breakpoints={{ "960px": "75vw" }}
          style={{ width: "40vw" }}
        >
          <FormGenerateDemo items={items} />
        </Dialog>
      </div>
    </DragDropContext>
  );
}

export default FormBuilder;