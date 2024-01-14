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

  removeStyles(html: string) {
    const doc = new DOMParser().parseFromString(html, 'text/html');

    // Remove all style elements
    const styleElements = doc.querySelectorAll('style');
    styleElements.forEach((styleElement) => styleElement.remove());

    // Remove inline styles from all elements
    const allElements = doc.querySelectorAll('*');
    allElements.forEach((element) => element.removeAttribute('style'));

    // Serialize the modified document back to HTML
    const cleanedHtml = new XMLSerializer().serializeToString(doc);

    return cleanedHtml;
  }

  handleChange = () => {
    if (this.editorRef.current) {
      const contentHtml = this.editorRef.current.innerHTML;
      const cleanedHtml = this.removeStyles(contentHtml);
      this.props.onChange(cleanedHtml);
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
