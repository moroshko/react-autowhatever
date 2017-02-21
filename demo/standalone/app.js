/* eslint-disable react/react-in-jsx-scope */

const items = [{
  text: 'Apple'
}, {
  text: 'Banana'
}, {
  text: 'Cherry'
}, {
  text: 'Grapefruit'
}, {
  text: 'Lemon'
}];

const renderItem = item => item.text;

class App extends React.Component { // eslint-disable-line no-undef
  constructor() {
    super();

    this.state = {
      value: ''
    };
  }

  onChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  render() {
    const { value } = this.state;
    const inputProps = {
      placeholder: 'Type to filter fruits',
      value,
      onChange: this.onChange
    };

    return (
      <Autowhatever // eslint-disable-line react/jsx-no-undef
        items={items}
        renderItem={renderItem}
        inputProps={inputProps}
        highlightedItemIndex={2}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app')); // eslint-disable-line no-undef
