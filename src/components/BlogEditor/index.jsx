import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './index.css';

const BlogEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const handleKeyCommand = (command, editorState) => {
    if (command === 'RETURN') {
      setEditorState(RichUtils.insertSoftNewline(editorState));
      return 'handled';
    }

    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  }
  
  const handleBold = (e) => {
    e.preventDefault();
    setIsBold(!isBold);
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }
  
  const handleItalic = (e) => {
    e.preventDefault();
    setIsItalic(!isItalic);
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  }

  const handleUnderline = (e) => {
    e.preventDefault();
    setIsUnderline(!isUnderline);
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  }

  const keyBindingFunction = (e) => {
    if (e.keyCode === 13) {
      return 'RETURN';
    }

    return getDefaultKeyBinding(e);
  }

  const getClassname = (isActive) => {
    return (isActive ? 'format-btn active' : 'format-btn');
  }
  
  return (
    <div className='editor'>
      <div className='toolbar'>
        <div>
          <button onMouseDown={handleBold} className={getClassname(isBold)}><strong>B</strong></button> 
          <button onMouseDown={handleItalic} className={getClassname(isItalic)}><em>I</em></button>
          <button onMouseDown={handleUnderline} className={getClassname(isUnderline)}><span id='underline'>U</span></button>
        </div>
      </div>
      <div> 
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFunction}
          onChange={setEditorState}
        />
      </div>
    </div>
  )
}

export default BlogEditor
