import { useState } from "react";
import "./Calcu.css";

const buttons = [
  "AC",
  "C",
  "/",
  7,
  8,
  9,
  "*",
  4,
  5,
  6,
  "-",
  1,
  2,
  3,
  "+",
  0,
  ".",
  "=",
];

const Calcu = () => {
  const [values, setValues] = useState({
    active: 0,
    previous: "",
    operators: "",
    answers: "",
    done: false,
  });

  return (
    <section
      style={{
        width: "410px",
        padding: "10px",
        background: "#102C57",
        borderRadius: "0.5rem",
        boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
      }}
    >
      <div
        style={{
          padding: "0 10px",
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "right",
          wordBreak: "break-all",
          wordSpacing: "wrap",
          outline: "2px solid black",
          marginBottom: "10px",
          background: "#F6F1E9",
          borderRadius: "0.5rem",
        }}
      >
        {values.previous}
        <br />
        {values.answers === "" ? values.active : values.answers}
      </div>
      <div
        style={{
          display: "flex",
          placeContent: "center",
          placeItems: "center",
          width: "100%",
          flexFlow: "row wrap",
          gap: "10px",
        }}
      >
        {buttons.map((numbers, id) => (
          <button
            key={id}
            style={{
              borderRadius: "0.5rem",
              fontSize: "2rem",
              fontWeight: "bold",
              width: "80px",
              height: "60px",
              outline: "2px solid black",
              flex:
                numbers === "=" || numbers === "AC" ? "0 0 200px" : "1 0 auto",
            }}
            onClick={() => {
              if (
                (numbers === "+" ||
                  numbers === "-" ||
                  numbers === "/" ||
                  numbers === "*" ||
                  numbers === "=") &&
                values.done === false
              ) {
                if (
                  values.previous === "" &&
                  values.operators === "" &&
                  values.active !== 0 &&
                  numbers !== "="
                ) {
                  setValues({
                    ...values,
                    previous: parseFloat(values.active),
                    active: numbers,
                    operators: numbers,
                  });
                }
                if (numbers === "=" && values.operators !== "") {
                  if (
                    values.operators === "+" &&
                    values.operators !== "-" &&
                    values.operators !== "*" &&
                    values.operators !== "/"
                  ) {
                    setValues({
                      ...values,
                      previous: values.previous + values.active,
                      answers:
                        parseFloat(values.previous) +
                        parseFloat(values.active.substring(1)),
                      active: "",
                      operators: "",
                      done: true,
                    });
                  } else if (
                    values.operators === "-" &&
                    values.operators !== "+" &&
                    values.operators !== "*" &&
                    values.operators !== "/"
                  ) {
                    setValues({
                      ...values,
                      answers:
                        parseFloat(values.previous) -
                        parseFloat(values.active.substring(1)),
                      previous: values.previous + values.active,

                      active: "",
                      operators: "",
                      done: true,
                    });
                  } else if (
                    values.operators === "*" &&
                    values.operators !== "+" &&
                    values.operators !== "-" &&
                    values.operators !== "/"
                  ) {
                    setValues({
                      ...values,
                      previous: values.previous + values.active,
                      answers:
                        parseFloat(values.previous) *
                        parseFloat(values.active.substring(1)),
                      active: "",
                      operators: "",
                      done: true,
                    });
                  } else if (
                    values.operators === "/" &&
                    values.operators !== "+" &&
                    values.operators !== "-" &&
                    values.operators !== "*"
                  ) {
                    setValues({
                      ...values,
                      previous: values.previous + values.active,
                      answers:
                        parseFloat(values.previous) /
                        parseFloat(values.active.substring(1)),
                      active: "",
                      operators: "",
                      done: true,
                    });
                  }
                }
              } else if (numbers === "AC")
                setValues({
                  ...values,
                  active: 0,
                  previous: "",
                  operators: "",
                  answers: "",
                  done: false,
                });
              else if (numbers === "C") {
                if (values.active.length > 1)
                  setValues({ ...values, active: values.active.slice(0, -1) });
                else if (values.active.length === 1)
                  setValues({ ...values, active: 0 });
              } else {
                if (
                  (values.done === true &&
                    numbers !== "+" &&
                    numbers !== "-" &&
                    numbers !== "/" &&
                    numbers !== "*" &&
                    numbers !== "=") ||
                  values.active === 0
                )
                  setValues({
                    ...values,
                    active: "" + numbers,
                    previous: "",
                    operators: "",
                    answers: "",
                    done: false,
                  });
                else if (values.done === false)
                  setValues({
                    ...values,
                    active: "" + values.active + numbers,
                  });
              }
            }}
          >
            {numbers}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Calcu;
