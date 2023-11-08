const inquirer = require("inquirer");
//const SVG = require("./svg");
//const { Circle, Triangle, Square } = require("./shapes");
const { writeFile } = require("fs/promises");

class LogoGenerator {
  async generateLogo() {
    try {
      const userInput = await inquirer.prompt([
        {
          name: "text",
          type: "input",
          message: "Enter text for the logo. (Must not be more than 3 characters.)",
          validate: (text) => text.length <= 3 || "The message must not contain more than 3 characters",
        },
        {
          name: "textColor",
          type: "input",
          message: "Enter a text color",
        },
        {
          name: "shapeType",
          type: "list",
          message: "Select a shape for the logo",
          choices: ["circle", "square", "triangle"],
        },
        {
          name: "shapeColor",
          type: "input",
          message: "Enter a shape color",
        },
      ]);

      const { text, textColor, shapeType, shapeColor } = userInput;

      let shape;
      switch (shapeType) {
        case "circle":
          shape = new Circle();
          break;
        case "square":
          shape = new Square();
          break;
        default:
          shape = new Triangle();
          break;
      }
      shape.setColor(shapeColor);

      const logoSVG = new SVG();
      logoSVG.setText(text, textColor);
      logoSVG.setShape(shape);
      await writeFile("logo.svg", logoSVG.render());
      console.log("Generated logo.svg");
    } catch (error) {
      console.log(error);
      console.log("Oops! Something went wrong.");
    }
  }
}

module.exports = LogoGenerator;
