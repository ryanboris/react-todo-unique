// stateless functional component

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: [],
    };
  }

  handleDeleteOptions() {
    this.setState(() => ({
      options: [],
    }));
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item';
    }
    if (this.state.options.indexOf(option) > -1) {
      return 'This option already exists';
    }

    this.setState(prevState => ({
      options: prevState.options.concat(option),
    }));
  }

  render() {
    const title = 'Indecision';
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
        <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

const Header = props => (
  <div>
    <h1>{props.title}</h1>
    <h2>{props.subtitle}</h2>
  </div>
);

const Action = props => (
  <div>
    <button onClick={props.handlePick} disabled={!props.hasOptions}>
      What should I do?
    </button>
  </div>
);

const Options = props => (
  <div>
    <button onClick={props.handleDeleteOptions}>Remove All</button>
    {props.options.map(option => (
      <Option key={option} optionText={option} />
    ))}
  </div>
);

const Option = props => <div>{props.optionText}</div>;

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined,
    };
  }

  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

// const User = (props) => {
//   return (
//     <div>
//       <p>Name: {props.name}</p>
//       <p>Age: {props.age}</p>
//     </div>
//   );
// };

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
