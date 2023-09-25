// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {language, updatefilterlanguage, eachLanguage, isactive} = props
  const onClickingLanguageBtn = () => {
    updatefilterlanguage(eachLanguage)
  }
  const btnHighLight = isactive ? 'high-light' : ''

  return (
    <li>
      <button
        type="button"
        className={`each-language ${btnHighLight}`}
        onClick={onClickingLanguageBtn}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
