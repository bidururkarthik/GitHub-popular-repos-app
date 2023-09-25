import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    repositories: [],
    activelanguage: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activelanguage} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activelanguage}`

    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updateData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        repositories: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  updatefilterlanguage = id => {
    this.setState(
      {activelanguage: id, apiStatus: apiStatusConstants.inProgress},
      this.getRepositories,
    )
  }

  renderlanguagefilteritem = () => {
    const {repositories} = this.state
    return (
      <ul className="all-repositories-container">
        {repositories.map(eachItem => (
          <RepositoryItem key={eachItem.id} eachfilterItem={eachItem} />
        ))}
      </ul>
    )
  }

  renderfilterlangaes = () => {
    const {activelanguage} = this.state
    return (
      <ul className="languages-container">
        {languageFiltersData.map(eachfilter => (
          <LanguageFilterItem
            language={eachfilter.language}
            updatefilterlanguage={this.updatefilterlanguage}
            eachLanguage={eachfilter.id}
            isactive={eachfilter.id === activelanguage}
            key={eachfilter.id}
          />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-txt">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="🤚">
      <div className="👉" />
      <div className="👉" />
      <div className="👉" />
      <div className="👉" />
      <div className="🌴" />
      <div className="👍" />
    </div>
  )

  renderlistrepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success: {
        return this.renderlanguagefilteritem()
      }
      case apiStatusConstants.failure: {
        return this.renderFailureView()
      }
      case apiStatusConstants.inProgress: {
        return this.renderLoadingView()
      }
      default:
        return null
    }
  }

  render() {
    return (
      <div className="github-main-container">
        <h1 className="github-main-heading">Popular</h1>
        {this.renderfilterlangaes()}
        {this.renderlistrepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
