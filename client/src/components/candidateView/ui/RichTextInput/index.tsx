import styles from "./styles.module.css"
import { useEffect, useRef } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../store"
import {
  setInputValue,
  setInputVisible,
} from "../../../../features/clientFlow/clientFlowSlice"
import { useDraggableArea } from "../../../../hooks/useDraggableArea"

interface RichTextInputType {
  commentMode: boolean
}

export default function RichTextInput({ commentMode }: RichTextInputType) {
  const dispatch = useDispatch<AppDispatch>()
  const { inputValue } = useSelector((state: RootState) => state.clientFlow)
  const { submitComment, takeScreenshot } = useDraggableArea(commentMode)
  const quillRef = useRef<ReactQuill>(null)

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  }

  useEffect(() => {
    // Focus the editor when the component mounts
    if (quillRef.current) {
      quillRef.current.getEditor().focus()
    }
  }, [])

  function handleSubmit() {
    if (inputValue) {
      takeScreenshot().then(() => {
        submitComment(inputValue)
      })
    } else {
      dispatch(setInputVisible(false))
      dispatch(setInputValue(""))
    }
  }

  return (
    <div className={styles.richTextInput}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={inputValue}
        onChange={(content) => dispatch(setInputValue(content))}
        modules={modules}
      />
      <div id="toolbar" className={styles.toolbar}>
        <div>
          <button className="ql-bold"></button>
          <button className="ql-list" value="bullet"></button>
        </div>
        <button
          className={styles.submitButton}
          type="button"
          onClick={handleSubmit}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5003 10.0002L3.91531 3.36189C3.83776 3.33208 3.75311 3.326 3.6721 3.34439C3.59109 3.36279 3.51737 3.40485 3.46031 3.46522C3.40157 3.5272 3.36113 3.60422 3.34348 3.68777C3.32583 3.77131 3.33166 3.85811 3.36031 3.93855L5.41697 10.0002M17.5003 10.0002L3.91531 16.6386C3.83776 16.6684 3.75311 16.6744 3.6721 16.656C3.59109 16.6376 3.51737 16.5956 3.46031 16.5352C3.40157 16.4732 3.36113 16.3962 3.34348 16.3127C3.32583 16.2291 3.33166 16.1423 3.36031 16.0619L5.41697 10.0002M17.5003 10.0002H5.41697"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
