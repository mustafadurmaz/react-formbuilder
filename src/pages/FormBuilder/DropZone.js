import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Sidebar } from "primereact/sidebar";
import { useTranslation } from "react-i18next";
import { Droppable } from "react-beautiful-dnd";

import DraggableItem from "./DraggableItem";
import CitiesComponent from "./FormComponents/CitiesComponent";
import GenderComponent from "./FormComponents/GenderComponent";
// import SpaceField from "../FormComponents/SpaceField/SpaceField";
// import ContactField from "../FormComponents/ContactField/ContactField";

const InputComponent = (props) => {
  console.log(props);
  const [visibleRight, setVisibleRight] = useState(false);
  const { t } = useTranslation(["common"]);

  //Form property sıralama indeksi
  useEffect(() => {
    props.setItems((prevValue) => {
      const temp = [...prevValue];
      temp[props.index].index = props.index;
      return temp;
    });
  }, [props.index]);

  return (
    <div key={props.index} className="field">
      <Sidebar
        visible={visibleRight}
        position="right"
        style={{ width: "25%" }}
        onHide={() => setVisibleRight(false)}
      >
        <div className="formgrid grid mt-6">
          <div className="field col-12">
            <h5 className="required" style={{ marginBottom: "0.5em" }}>
              {t("Label")}
            </h5>
            <InputText
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].label = e.target.value;
                  return temp;
                });
              }}
              value={props.item.label}
              style={{ width: "100%" }}
            />
          </div>

          <div className="field col-12">
            <h5 style={{ marginBottom: "0.5em" }}>{t("Placeholder")}</h5>
            <InputText
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].placeholder = e.target.value;
                  return temp;
                });
              }}
              value={props.item.placeholder}
              style={{ width: "100%" }}
            />
          </div>

          <div className="field col-12">
            <h5 style={{ marginBottom: "0.5em" }}>{t("Default Value")}</h5>
            <InputText
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].defaultValue = e.target.value;
                  return temp;
                });
              }}
              value={props.item.defaultValue}
              style={{ width: "100%" }}
            />
          </div>

          <div className="field col-12">
            <Checkbox
              inputId="cb1"
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].rules.required =
                    !temp[props.index].rules.required;
                  return temp;
                });
              }}
              checked={props.item.rules.required}
            ></Checkbox>
            <span className="ml-3 font-semibold text-xl">Required</span>
          </div>
        </div>

        <div className="mt-4 flex justify-content-end">
          <Button
            label="Clear Fields"
            className="p-button-secondary"
            icon="pi pi-delete-left"
            onClick={() => {
              props.setItems((prevValue) => {
                const temp = [...prevValue];
                temp[props.index].label = "";
                temp[props.index].placeholder = "";
                temp[props.index].defaultValue = "";
                temp[props.index].rules.required = false;
                return temp;
              });
            }}
            autoFocus
          />
        </div>
      </Sidebar>

      {/* <InputText disabled placeholder={props.item.label ? props.item.label :"Text"} style={{ width: 250 }} /> */}
      <div className="formgrid">
        <div className="field">
          <h5>{props.item.label ? props.item.label : "Label"}</h5>
          <InputText disabled placeholder="Text" style={{ width: "40%" }} />
          <Button
            className="p-button-rounded p-button-sm p-button-success ml-3"
            icon="pi pi-pencil"
            onClick={() => setVisibleRight(true)}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger ml-2"
            onClick={() => {
              const list = [...props.items];
              list.splice(props.index, 1);
              props.setItems(list);
            }}
          />
        </div>
      </div>

      {/* <div className="flex justify-content-between mt-2">
        <div>
          <Button
            className="p-button-rounded p-button-sm  p-button-secondary"
            label="Details"
            onClick={() => setVisibleRight(true)}
          />
        </div>
        {!props.item._id ? (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger"
            onClick={() => {
              const list = [...props.items];
              list.splice(props.index, 1);
              props.setItems(list);
            }}
          />
        ) : (
          <div>
            {props.item.isActive === true ? (
              <span className="mr-2 font-bold text-lg">Active</span>
            ) : (
              <span className="mr-2 font-bold text-lg">Passive</span>
            )}
            <Checkbox
              inputId="cb11"
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].isActive = !temp[props.index].isActive;
                  return temp;
                });
              }}
              checked={props.item.isActive}
            ></Checkbox>
          </div>
        )}
      </div> */}
    </div>
  );
};

const InputTextareaComponent = (props) => {
  console.log(props);
  const [visibleRight, setVisibleRight] = useState(false);
  const { t } = useTranslation(["common"]);

  //Form property sıralama indeksi
  useEffect(() => {
    props.setItems((prevValue) => {
      const temp = [...prevValue];
      temp[props.index].index = props.index;
      return temp;
    });
  }, [props.index]);

  return (
    <div key={props.index} className="field">
      <Sidebar
        visible={visibleRight}
        position="right"
        style={{ width: "25%" }}
        onHide={() => setVisibleRight(false)}
      >
        <div className="formgrid grid mt-6">
          <div className="field col-12">
            <h5 className="required" style={{ marginBottom: "0.5em" }}>
              {t("Label")}
            </h5>
            <InputText
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].label = e.target.value;
                  return temp;
                });
              }}
              value={props.item.label}
              style={{ width: "100%" }}
            />
          </div>

          <div className="field col-12">
            <h5 style={{ marginBottom: "0.5em" }}>{t("Placeholder")}</h5>
            <InputText
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].placeholder = e.target.value;
                  return temp;
                });
              }}
              value={props.item.placeholder}
              style={{ width: "100%" }}
            />
          </div>

          <div className="field col-12">
            <h5 style={{ marginBottom: "0.5em" }}>{t("Default Value")}</h5>
            <InputText
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].defaultValue = e.target.value;
                  return temp;
                });
              }}
              value={props.item.defaultValue}
              style={{ width: "100%" }}
            />
          </div>

          <div className="field col-12">
            <Checkbox
              inputId="cb2"
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].rules.required =
                    !temp[props.index].rules.required;
                  return temp;
                });
              }}
              checked={props.item.rules.required}
            ></Checkbox>
            <span className="ml-3 font-semibold text-xl">Required</span>
          </div>
        </div>

        <div className="mt-4 flex justify-content-end">
          <Button
            label="Clear Fields"
            className="p-button-secondary"
            icon="pi pi-delete-left"
            onClick={() => {
              props.setItems((prevValue) => {
                const temp = [...prevValue];
                temp[props.index].label = "";
                temp[props.index].placeholder = "";
                temp[props.index].defaultValue = "";
                temp[props.index].rules.required = false;
                return temp;
              });
            }}
            autoFocus
          />
        </div>
      </Sidebar>

      <div className="formgrid">
        <div className="field">
          <h5>{props.item.label ? props.item.label : "Label"}</h5>
          <InputTextarea
            disabled
            placeholder="Text Area"
            style={{ width: "40%" }}
          />
          <Button
            className="p-button-rounded p-button-sm p-button-success ml-3"
            icon="pi pi-pencil"
            onClick={() => setVisibleRight(true)}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger ml-2"
            onClick={() => {
              const list = [...props.items];
              list.splice(props.index, 1);
              props.setItems(list);
            }}
          />
        </div>
      </div>

      {/* <InputTextarea disabled placeholder="Text Area" style={{ width: 250 }} /> */}

      {/* <div className="flex justify-content-between mt-2">
        <div>
          <Button
            className="p-button-rounded p-button-sm  p-button-secondary"
            label="Details"
            onClick={() => onClick('displayResponsive')}
          />
        </div>
        {!props.item._id ? (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger"
            onClick={() => {
              const list = [...props.items];
              list.splice(props.index, 1);
              props.setItems(list);
            }}
          />
        ) : (
          <div>
            {props.item.isActive === true ? (
              <span className="mr-2 font-bold text-lg">Active</span>
            ) : (
              <span className="mr-2 font-bold text-lg">Passive</span>
            )}
            <Checkbox
              inputId="cb22"
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].isActive = !temp[props.index].isActive;
                  return temp;
                });
              }}
              checked={props.item.isActive}
            ></Checkbox>
          </div>
        )}
      </div> */}
    </div>
  );
};

const DropDownComponent = (props) => {
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [displayResponsive2, setDisplayResponsive2] = useState(false);
  const [position, setPosition] = useState("center");
  const [visibleRight, setVisibleRight] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState(false);
  const { t } = useTranslation(["common"]);

  //Form property sıralama indeksi
  useEffect(() => {
    props.setItems((prevValue) => {
      const temp = [...prevValue];
      temp[props.index].index = props.index;
      return temp;
    });
  }, [props.index]);

  const renderFooter2 = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => setVisibleOptions(false)}
          className="p-button-text"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          onClick={async () => {
            await props.setItems((prevValue) => {
              const temp = [...prevValue];
              temp[props.index].options = inputList;
              return temp;
            });
            await setVisibleOptions(false);
          }}
          autoFocus
        />
      </div>
    );
  };
  const [inputList, setInputList] = useState([{ optionsName: "" }]);
  console.log(props.item.options.length);
  useEffect(() => {
    if (props.item.options.length > 0) {
      setInputList(props.item.options);
    }
  }, [props.item.options]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { optionsName: "" }]);
  };
  return (
    <div key={props.index} className="field">
      {/* <Dropdown disabled placeholder="Dropdown" style={{ width: 250 }} />
      <div className="flex justify-content-between mt-2">
        <div>
          <Button
            className="p-button-rounded p-button-sm p-button-secondary"
            label="Details"
            onClick={() => onClick('displayResponsive')}
          />
        </div>
        {!props.item._id ? (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger"
            onClick={() => {
              const list = [...props.items];
              list.splice(props.index, 1);
              props.setItems(list);
            }}
          />
        ) : (
          <div>
            {props.item.isActive === true ? (
              <span className="mr-2 font-bold text-lg">Active</span>
            ) : (
              <span className="mr-2 font-bold text-lg">Passive</span>
            )}
            <Checkbox
              inputId="cb33"
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].isActive = !temp[props.index].isActive;
                  return temp;
                });
              }}
              checked={props.item.isActive}
            ></Checkbox>
          </div>
        )}
      </div> */}

      <div className="formgrid">
        <div className="field">
          <h5>{props.item.label ? props.item.label : "Label"}</h5>
          <Dropdown disabled placeholder="DropDown" style={{ width: "40%" }} />
          <Button
            className="p-button-rounded p-button-sm p-button-success ml-3"
            icon="pi pi-pencil"
            onClick={() => setVisibleRight(true)}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger ml-2"
            onClick={() => {
              const list = [...props.items];
              list.splice(props.index, 1);
              props.setItems(list);
            }}
          />
        </div>
      </div>

      <Sidebar
        visible={visibleRight}
        position="right"
        style={{ width: "25%" }}
        onHide={() => setVisibleRight(false)}
      >
        <div className="formgrid grid mt-6">
          <div className="field col-12">
            <h5 className="required" style={{ marginBottom: "0.5em" }}>
              {t("Label")}
            </h5>
            <InputText
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].label = e.target.value;
                  return temp;
                });
              }}
              value={props.item.label}
              style={{ width: "100%" }}
            />
          </div>

          <div className="field col-12">
            <h5 style={{ marginBottom: "0.5em" }}>{t("Placeholder")}</h5>
            <InputText
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].placeholder = e.target.value;
                  return temp;
                });
              }}
              value={props.item.placeholder}
              style={{ width: "100%" }}
            />
          </div>

          <div className="field col-12">
            <h5 style={{ marginBottom: "0.5em" }}>{t("Default Value")}</h5>
            <InputText
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].defaultValue = e.target.value;
                  return temp;
                });
              }}
              value={props.item.defaultValue}
              style={{ width: "100%" }}
            />
          </div>

          <div className="field col-12">
            <Checkbox
              inputId="cb3"
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].rules.required =
                    !temp[props.index].rules.required;
                  return temp;
                });
              }}
              checked={props.item.rules.required}
            ></Checkbox>
            <span className="ml-3 font-semibold text-xl">Required</span>
          </div>
        </div>

        <div className="mt-4 flex justify-content-between">
          <Button
            className="p-button-secondary"
            label="Options"
            // icon="pi pi-external-link"
            onClick={() => setVisibleOptions(true)}
          />
          <Button
            label="Clear Fields"
            className="p-button-secondary"
            icon="pi pi-delete-left"
            onClick={() => {
              props.setItems((prevValue) => {
                const temp = [...prevValue];
                temp[props.index].label = "";
                temp[props.index].placeholder = "";
                temp[props.index].defaultValue = "";
                temp[props.index].rules.required = false;
                return temp;
              });
            }}
            autoFocus
          />
        </div>
      </Sidebar>

      <Dialog
        header="Options"
        visible={visibleOptions}
        onHide={() => setVisibleOptions(false)}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "30vw" }}
        footer={renderFooter2("displayResponsive2")}
      >
        {inputList.map((x, i) => {
          return (
            <div key={i} className="formgrid">
              <div className="field">
                <InputText
                  name="optionsName"
                  placeholder="Enter Option Name"
                  value={x.optionsName}
                  onChange={(e) => handleInputChange(e, i)}
                  style={{ width: "50%" }}
                />

                {inputList.length !== 1 && (
                  <Button
                    className="p-button-rounded p-button-danger ml-3"
                    icon="pi pi-trash"
                    onClick={() => handleRemoveClick(i)}
                  ></Button>
                )}
                {inputList.length - 1 === i && (
                  <Button
                    className="p-button-rounded p-button-success ml-2"
                    icon="pi pi-plus"
                    onClick={handleAddClick}
                  ></Button>
                )}
              </div>
            </div>
          );
        })}
        {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
      </Dialog>
    </div>
  );
};

const RadioComponent = (props) => {
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [displayResponsive2, setDisplayResponsive2] = useState(false);
  const [position, setPosition] = useState("center");
  const [visibleRight, setVisibleRight] = useState(false);
  const [visibleOptions, setVisibleOptions] = useState(false);
  const { t } = useTranslation(["common"]);

  //Form property sıralama indeksi
  useEffect(() => {
    props.setItems((prevValue) => {
      const temp = [...prevValue];
      temp[props.index].index = props.index;
      return temp;
    });
  }, [props.index]);

  const renderFooter2 = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => setVisibleOptions(false)}
          className="p-button-text"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          onClick={async () => {
            await props.setItems((prevValue) => {
              const temp = [...prevValue];
              temp[props.index].options = inputList;
              return temp;
            });
            await setVisibleOptions(false);
          }}
          autoFocus
        />
      </div>
    );
  };

  const [inputList, setInputList] = useState([{ optionsName: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { optionsName: "" }]);
  };
  return (
    <div key={props.index} className="field">
      {/* <RadioButton disabled placeholder="RadioButton" />
      <span className="ml-2" style={{ color: '#a3a9af' }}>
        RadioButton
      </span>
      <div className="flex justify-content-between mt-2">
        <div>
          <Button
            className="p-button-rounded p-button-sm  p-button-secondary"
            label="Details"
            onClick={() => onClick('displayResponsive')}
          />
        </div>
        {!props.item._id ? (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger"
            onClick={() => {
              const list = [...props.items];
              list.splice(props.index, 1);
              props.setItems(list);
            }}
          />
        ) : (
          <div>
            {props.item.isActive === true ? (
              <span className="mr-2 font-bold text-lg">Active</span>
            ) : (
              <span className="mr-2 font-bold text-lg">Passive</span>
            )}
            <Checkbox
              inputId="cb44"
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].isActive = !temp[props.index].isActive;
                  return temp;
                });
              }}
              checked={props.item.isActive}
            ></Checkbox>
          </div>
        )}
      </div> */}

      <div className="formgrid">
        <div className="field">
          <h5>{props.item.label ? props.item.label : "Label"}</h5>
          <RadioButton disabled style={{ width: "40%" }} />
          <Button
            className="p-button-rounded p-button-sm p-button-success ml-3"
            icon="pi pi-pencil"
            onClick={() => setVisibleRight(true)}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger ml-2"
            onClick={() => {
              const list = [...props.items];
              list.splice(props.index, 1);
              props.setItems(list);
            }}
          />
        </div>
      </div>

      <Sidebar
        visible={visibleRight}
        position="right"
        style={{ width: "25%" }}
        onHide={() => setVisibleRight(false)}
      >
        <div className="formgrid grid mt-6">
          <div className="field col-12">
            <h5 className="required" style={{ marginBottom: "0.5em" }}>
              {t("Label")}
            </h5>
            <InputText
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].label = e.target.value;
                  return temp;
                });
              }}
              value={props.item.label}
              style={{ width: "100%" }}
            />
          </div>

          <div className="field col-12">
            <Checkbox
              inputId="cb4"
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].rules.required =
                    !temp[props.index].rules.required;
                  return temp;
                });
              }}
              checked={props.item.rules.required}
            ></Checkbox>
            <span className="ml-3 font-semibold text-xl">Required</span>
          </div>
        </div>

        <div className="mt-4 flex justify-content-between">
          <Button
            className="p-button-secondary"
            label="Options"
            // icon="pi pi-external-link"
            onClick={() => setVisibleOptions(true)}
          />
          <Button
            label="Clear Fields"
            className="p-button-secondary"
            icon="pi pi-delete-left"
            onClick={() => {
              props.setItems((prevValue) => {
                const temp = [...prevValue];
                temp[props.index].label = "";
                temp[props.index].rules.required = false;
                return temp;
              });
            }}
            autoFocus
          />
        </div>
      </Sidebar>

      <Dialog
        header="Options"
        visible={visibleOptions}
        onHide={() => setVisibleOptions(false)}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "30vw" }}
        footer={renderFooter2("displayResponsive2")}
      >
        {inputList.map((x, i) => {
          return (
            <div key={i} className="formgrid">
              <div className="field">
                <InputText
                  name="optionsName"
                  placeholder="Enter Option Name"
                  value={x.optionsName}
                  onChange={(e) => handleInputChange(e, i)}
                  style={{ width: "50%" }}
                />

                {inputList.length !== 1 && (
                  <Button
                    className="p-button-rounded p-button-danger ml-3"
                    icon="pi pi-trash"
                    onClick={() => handleRemoveClick(i)}
                  ></Button>
                )}
                {inputList.length - 1 === i && (
                  <Button
                    className="p-button-rounded p-button-success ml-2"
                    icon="pi pi-plus"
                    onClick={handleAddClick}
                  ></Button>
                )}
              </div>
            </div>
          );
        })}
        {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
      </Dialog>
    </div>
  );
};

const CheckBoxComponent = (props) => {
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState("center");
  const [visibleRight, setVisibleRight] = useState(false);
  const { t } = useTranslation(["common"]);

  //Form property sıralama indeksi
  useEffect(() => {
    props.setItems((prevValue) => {
      const temp = [...prevValue];
      temp[props.index].index = props.index;
      return temp;
    });
  }, [props.index]);

  return (
    <div key={props.index} className="field">
      <Sidebar
        visible={visibleRight}
        position="right"
        style={{ width: "25%" }}
        onHide={() => setVisibleRight(false)}
      >
        <div className="formgrid grid mt-6">
          <div className="field col-12">
            <h5 className="required" style={{ marginBottom: "0.5em" }}>
              {t("Label")}
            </h5>
            <InputText
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].label = e.target.value;
                  return temp;
                });
              }}
              value={props.item.label}
              style={{ width: "100%" }}
            />
          </div>

          <div className="field col-12">
            <h5 className="required" style={{ marginBottom: "0.5em" }}>
              {t("Text")}
            </h5>
            <InputText
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].label2 = e.target.value;
                  return temp;
                });
              }}
              value={props.item.label2}
              style={{ width: "100%" }}
            />
          </div>

          <div className="field col-12">
            <Checkbox
              inputId="cb5"
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].rules.required =
                    !temp[props.index].rules.required;
                  return temp;
                });
              }}
              checked={props.item.rules.required}
            ></Checkbox>
            <span className="ml-3 font-semibold text-xl">Required</span>
          </div>
        </div>

        <div className="mt-4 flex justify-content-end">
          <Button
            label="Clear Fields"
            className="p-button-secondary"
            icon="pi pi-delete-left"
            onClick={() => {
              props.setItems((prevValue) => {
                const temp = [...prevValue];
                temp[props.index].label = "";
                temp[props.index].label2 = "";
                temp[props.index].rules.required = false;
                return temp;
              });
            }}
            autoFocus
          />
        </div>
      </Sidebar>

      <div className="formgrid">
        <div className="field">
          <h5>{props.item.label ? props.item.label : "Label"}</h5>
          <Checkbox disabled style={{ width: "40%" }} />
          <Button
            className="p-button-rounded p-button-sm p-button-success ml-3"
            icon="pi pi-pencil"
            onClick={() => setVisibleRight(true)}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger ml-2"
            onClick={() => {
              const list = [...props.items];
              list.splice(props.index, 1);
              props.setItems(list);
            }}
          />
        </div>
      </div>

      {/* <div className="flex justify-content-between mt-2">
        <div>
          <Button
            className="p-button-rounded p-button-sm  p-button-secondary"
            label="Details"
            onClick={() => onClick('displayResponsive')}
          />
        </div>
        {!props.item._id ? (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger"
            onClick={() => {
              const list = [...props.items];
              list.splice(props.index, 1);
              props.setItems(list);
            }}
          />
        ) : (
          <div>
            {props.item.isActive === true ? (
              <span className="mr-2 font-bold text-lg">Active</span>
            ) : (
              <span className="mr-2 font-bold text-lg">Passive</span>
            )}
            <Checkbox
              inputId="cb55"
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].isActive = !temp[props.index].isActive;
                  return temp;
                });
              }}
              checked={props.item.isActive}
            ></Checkbox>
          </div>
        )}
      </div> */}
    </div>
  );
};

const DateComponent = (props) => {
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState("center");
  const [visibleRight, setVisibleRight] = useState(false);
  const { t } = useTranslation(["common"]);

  //Form property sıralama indeksi
  useEffect(() => {
    props.setItems((prevValue) => {
      const temp = [...prevValue];
      temp[props.index].index = props.index;
      return temp;
    });
  }, [props.index]);

  return (
    <div key={props.index} className="field">
      <Sidebar
        visible={visibleRight}
        position="right"
        style={{ width: "25%" }}
        onHide={() => setVisibleRight(false)}
      >
        <div className="formgrid grid mt-6">
          <div className="field col-12">
            <h5 className="required" style={{ marginBottom: "0.5em" }}>
              {t("Label")}
            </h5>
            <InputText
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].label = e.target.value;
                  return temp;
                });
              }}
              value={props.item.label}
              style={{ width: "100%" }}
            />
          </div>

          <div className="field col-12">
            <h5 style={{ marginBottom: "0.5em" }}>{t("Placeholder")}</h5>
            <InputText
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].placeholder = e.target.value;
                  return temp;
                });
              }}
              value={props.item.placeholder}
              style={{ width: "100%" }}
            />
          </div>

          <div className="field col-12">
            <Checkbox
              inputId="cb6"
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].rules.required =
                    !temp[props.index].rules.required;
                  return temp;
                });
              }}
              checked={props.item.rules.required}
            ></Checkbox>
            <span className="ml-3 font-semibold text-xl">Required</span>
          </div>
        </div>

        <div className="mt-4 flex justify-content-end">
          <Button
            label="Clear Fields"
            className="p-button-secondary"
            icon="pi pi-delete-left"
            onClick={() => {
              props.setItems((prevValue) => {
                const temp = [...prevValue];
                temp[props.index].label = "";
                temp[props.index].placeholder = "";
                temp[props.index].rules.required = false;
                return temp;
              });
            }}
            autoFocus
          />
        </div>
      </Sidebar>

      <div className="formgrid">
        <div className="field">
          <h5>{props.item.label ? props.item.label : "Label"}</h5>
          <Calendar
            disabled
            placeholder="Date"
            showIcon
            style={{ width: "40%" }}
          />
          <Button
            className="p-button-rounded p-button-sm p-button-success ml-3"
            icon="pi pi-pencil"
            onClick={() => setVisibleRight(true)}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger ml-2"
            onClick={() => {
              const list = [...props.items];
              list.splice(props.index, 1);
              props.setItems(list);
            }}
          />
        </div>
      </div>

      {/* <div className="flex justify-content-between mt-2">
        <div>
          <Button
            className="p-button-rounded p-button-sm  p-button-secondary"
            label="Details"
            onClick={() => onClick('displayResponsive')}
          />
        </div>
        {!props.item._id ? (
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger"
            onClick={() => {
              const list = [...props.items];
              list.splice(props.index, 1);
              props.setItems(list);
            }}
          />
        ) : (
          <div>
            {props.item.isActive === true ? (
              <span className="mr-2 font-bold text-lg">Active</span>
            ) : (
              <span className="mr-2 font-bold text-lg">Passive</span>
            )}
            <Checkbox
              inputId="cb66"
              onChange={(e) => {
                props.setItems((prevValue) => {
                  const temp = [...prevValue];
                  temp[props.index].isActive = !temp[props.index].isActive;
                  return temp;
                });
              }}
              checked={props.item.isActive}
            ></Checkbox>
          </div>
        )}
      </div> */}
    </div>
  );
};

const DropZone = (props) => {
  const [hoverdCompId, sethoverdCompId] = React.useState(null);

  const renderItem = (item, index) => {
    switch (item.type) {
      case "text":
        return (
          <InputComponent
            item={item}
            index={index}
            setItems={props.setItems}
            items={props.items}
          />
        );
      case "textarea":
        return (
          <InputTextareaComponent
            item={item}
            index={index}
            setItems={props.setItems}
            items={props.items}
          />
        );
      case "dropdown":
        return (
          <DropDownComponent
            item={item}
            index={index}
            setItems={props.setItems}
            items={props.items}
          />
        );
      case "radio":
        return (
          <RadioComponent
            item={item}
            index={index}
            setItems={props.setItems}
            items={props.items}
          />
        );
      case "checkbox":
        return (
          <CheckBoxComponent
            item={item}
            index={index}
            setItems={props.setItems}
            items={props.items}
          />
        );
      case "date":
        return (
          <DateComponent
            item={item}
            index={index}
            setItems={props.setItems}
            items={props.items}
          />
        );
      case "cities":
        return (
          <CitiesComponent
            item={item}
            index={index}
            setItems={props.setItems}
            items={props.items}
          />
        );
      case "gender":
        return (
          <GenderComponent
            item={item}
            index={index}
            setItems={props.setItems}
            items={props.items}
          />
        );
      // case "spaceList":
      //   return (
      //     <SpaceField
      //       item={item}
      //       index={index}
      //       setItems={props.setItems}
      //       items={props.items}
      //     />
      //   );
      // case "contactList":
      //   return (
      //     <ContactField
      //       item={item}
      //       index={index}
      //       setItems={props.setItems}
      //       items={props.items}
      //     />
      //   );
      default:
        break;
    }
  };

  const toggleHover = (e, item) => {
    sethoverdCompId(item.key);
  };
  return (
    <div>
      <Droppable droppableId={props.droppableId}>
        {(provided, snapshot) => (
          <div
            style={{
              minHeight: 500,
              backgroundColor: snapshot.isDraggingOver ? "#f5f5f5" : "",
            }}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.items.length > 0
              ? props.items.map((item, index) => (
                  <DraggableItem
                    key={"di" + index}
                    item={item}
                    index={index}
                    hoverdCompId={hoverdCompId}
                    renderItem={renderItem}
                    toggleHover={toggleHover}
                  />
                ))
              : !snapshot.isDraggingOver && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 500,
                    }}
                  >
                    <p>Drop items here</p>
                  </div>
                )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DropZone;