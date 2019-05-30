/**
 * # PART B: Formidable React Exercise
 *
 * ## Preparation
 *
 * 1. Please sign out of your CodeSandbox account before starting.
 * 2. Click "Fork" in the top toolbar. CodeSandbox will create an anonymous
 * .  URL you can share with Formidable.
 * 3. To ensure proper saving: Do not open multiple browser tabs with your
 *    CodeSandbox URL.
 *
 * ## Submission
 *
 * Email the URL of your final solution back to Formidable when you're done.
 * Make sure to "Save" your CodeSandbox first! We also recommend you copy your
 * solution to a backed-up file in case CodeSandbox is not available.
 *
 * ## Requirements
 *
 * Using the best React practices you know, implement an application based on
 * the below requirements. The complete solution should be in this file.
 * Use either TypeScript or JavaScript with propTypes for your submission.
 *
 * EXERCISE: Implement a `<Typeahead className="Typeahead"/>` component that
 * receives the value of the `carBrands` global in a prop called `listItems`.
 *
 * 1. As the user types in a text input field, a list of options should appear
 *    below it. The list should contain items from `listItems` that **start**
 *    with the user entered value (case insensitive).
 * 2.1. Use semantic HTML React elements for the list and add a `className="List"`
 *    prop to the containing element.
 * 2.2. Use semantic HTML React elements for text input field and add a
 *    `className="TextInput"` prop to the containing element.
 * 3. Every new character typed should filter the list.
 * 4. List should only appear when input is not empty. Whitespace is
 *    considered empty.
 * 5. Clicking on a list item should populate the input with that item's
 *    string value and hide the list.
 * 6. For visible option strings, style the substring the user has entered as
 *    **bold**.
 * 7. Using inline styles, highlight a list item with gray background and white
 *    text when the user mouses over it. The styles should literally be
 *    `{ background: "gray", color: "white" }`.
 * 8.1 Add keyboard events to allow selection of an option without using a mouse.
 *    - Using "tab" and "shift+tab", the user should be able to focus the different
 *      list items.
 *    - Pressing the "return" key when an item is focused should populate the input
 *      with the focused item's string value, hide the list, and focus the input
 *      again.
 * 8.2 Additional detail:
 *    - With the cursor in the input, pressing the "tab" key should _focus_ the
 *      first item with the default browser focus style.
 *    - Subsequent presses of the "tab" key should focus the next item in the list.
 *    - Pressing the "shift+tab" keys should focus the previous item in the list.
 *    - Pressing the "shift+tab" key when the first item is focused should focus
 *      the input again.
 *    - Mousing over other list items should _highlight_ them while the keyboard-
 *      focused item remains _focused_.
 *    - Pressing the “tab” key when no list is visible should move focus away
 *      from the input.
 */

import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Radium from "radium";

import "./styles.css";

const carBrands = [
  "Alfa Romeo",
  "Audi",
  "BMW",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Jaguar",
  "Jeep",
  "Kia",
  "Mazda",
  "Mercedez-Benz",
  "Mitsubishi",
  "Nissan",
  "Peugeot",
  "Porsche",
  "SAAB",
  "Subaru",
  "Suzuki",
  "Toyota",
  "Volkswagen",
  "Volvo"
];

class Typeahead extends React.Component {
  static propTypes = {
    listItems: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      currentItem: -1,
      filteredItems: [],
      showItems: false,
      userInput: ""
    };
  }

  onChange = event => {
    const { listItems } = this.props;
    const userInput = event.target.value;
    if (userInput !== " ") {
      const filteredItems = listItems.filter(item =>
        item.toLowerCase().startsWith(userInput.toLowerCase())
      );

      this.setState({
        currentItem: -1,
        filteredItems,
        showItems: true,
        userInput: event.target.value
      });
    }
  };

  onClick = event => {
    this.setState({
      currentItem: -1,
      filteredItems: [],
      showItems: false,
      userInput: event.currentTarget.innerText
    });
  };

  onKeyDown = event => {
    const { currentItem, filteredItems, showItems } = this.state;

    if (showItems) {
      //enter key means set the input to the currently focused
      if (event.key === "Enter") {
        if (currentItem !== -1) {
          this.setState({
            currentItem: -1,
            showItems: false,
            userInput: filteredItems[currentItem]
          });
        }
      }

      //shift + tab means move up the list
      else if (event.shiftKey && event.key === "Tab") {
        if (currentItem === -1) {
          return;
        }
        this.setState({
          currentItem: currentItem - 1
        });
      }

      //tab key means move down the list to the next, so long as we're not at the last
      else if (event.key === "Tab") {
        if (currentItem === filteredItems.length - 1) {
          return;
        }
        this.setState({
          currentItem: currentItem + 1
        });
      }
    }
  };

  render() {
    const {
      onClick,
      onChange,
      onKeyDown,
      state: { filteredItems, showItems, userInput }
    } = this;

    let listComponent;

    if (showItems && userInput) {
      if (filteredItems.length) {
        listComponent = (
          <ul className="List">
            {filteredItems.map((item, index) => {
              let suffix = item
                .toLowerCase()
                .replace(userInput.toLowerCase(), "");
              return (
                <li
                  key={item}
                  onClick={onClick}
                  onKeyDown={onKeyDown}
                  tabIndex={index + 2}
                  style={styles.base}
                >
                  <b>{userInput}</b>
                  {suffix}
                </li>
              );
            })}
          </ul>
        );
      } else {
        listComponent = (
          <div style={{ backgroundColor: "red" }}>
            <em>No matches, try something else!</em>
          </div>
        );
      }
    }
    return (
      <Fragment>
        <input
          type="text"
          placeholder="Start typing..."
          className="TextInput"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          tabIndex="1"
        />
        {listComponent}
      </Fragment>
    );
  }
}

Typeahead = Radium(Typeahead);

const styles = {
  base: {
    ":hover": {
      background: "gray",
      color: "white"
    }
  }
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Typeahead className="Typeahead" listItems={carBrands} />,
  rootElement
);
