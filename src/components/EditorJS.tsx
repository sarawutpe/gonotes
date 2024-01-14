import { Component, RefObject, createRef } from 'react';

interface EditorEditorJSProps {
  onChange: (content: string) => void;
  value: string;
}

class EditorJS extends Component<EditorEditorJSProps> {
  editorRef: RefObject<HTMLDivElement>;

  constructor(props: EditorEditorJSProps) {
    super(props);
    this.editorRef = createRef();
  }

  componentDidMount() {
    // Set initial value when the component mounts
    if (this.editorRef.current && this.props.value) {
      this.editorRef.current.innerHTML = this.props.value;
    }
  }

  componentDidUpdate(prevProps: EditorEditorJSProps) {
    // Update the content when the value prop changes
    if (this.props.value !== prevProps.value && this.editorRef.current) {
      this.editorRef.current.innerHTML = this.props.value;
    }
  }

  handleChange = () => {
    if (this.editorRef.current) {
      const contentHtml = this.editorRef.current.innerHTML;
      this.props.onChange(contentHtml);
    }
  };

  render() {
    return (
      <div className="editorjs-container">
        <div
          ref={this.editorRef}
          className="editorjs editorjs-blank border border-slate-200"
          data-gramm="false"
          contentEditable={true}
          onInput={this.handleChange}
        ></div>
      </div>
    );
  }
}

export default EditorJS;
