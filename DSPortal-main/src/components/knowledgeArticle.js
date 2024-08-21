import React, { useEffect } from "react"
import { useState } from "react"

import knowledgeArticleData from "../pages/resources/knowledgeArticles2.json"
import issueTypeData from "../pages/resources/issueType2.json"

const fullBleed = {
  backgroundColor: "#E3E1EB",
  borderTop: "1px solid #E3E1EB",
  borderBottom: "1px solid #E3E1EB",
  maxHeight: "550px",
  overflow: "hidden auto",
}

const cardContainer = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",

  padding: "5px",
  margin: `0 auto`,
  maxWidth: 1080,
}

const listItemStyles = {
  fontSize: "18px",
  margin: "5px",
  flex: "0 1 20%",
  textDecoration: "none",
  backgroundColor: "white",
  borderRadius: "6px",
  padding: "10px",
  boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",

  "&:hover": {
    cursor: "pointer",
  },
}

const linkTitle = {
  marginBottom: 2,
  fontSize: 10,
  fontWeight: "bold",
  marginLeft: "auto",
  textAlign: "end",
  paddingRight: 2.5,
  color: "#e87613",
}

const linkeSubText = {
  color: "black",
}

const linkBody = {
  paddingLeft: 2.5,
  paddingRight: 2.5,
  color: "black",
}

const filterSearchContainer = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  margin: `0 auto`,
  maxWidth: 1080,
  padding: `0 1.0875rem 1.45rem`,
  justifyContent: "space-between",
}

const contentSize = {
  margin: `0 auto`,
  maxWidth: 1080,
  padding: `0 1.0875rem 1.45rem`,
}

const btnContainer = {
  display: "flex",
  justifyContent: "center",
}

const btn = {
  padding: "2px 7px",
  fontSize: "12px",
  backgroundColor: "#243746",
  color: "white",
  borderRadius: "7px",
  display: "inline-block",
}

const KnowledgeArticles = ({ chosenFA, chosenTeam, chosenIssue }) => {
  const [filter, setFilter] = useState("")
  const [issueTypeFilterString, setIssueTypeFilter] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [items, setItems] = useState(knowledgeArticleData)
  const [uniqueFunctionalArea, setUniqueFunctionalArea] = useState([])
  const [uniqueIssType, setuniqueIssType] = useState([])
  const [issueType, setIssueType] = useState([])
  const [uniqueIFunSub, setUniqueIFunSub] = useState([])
  const [team, setTeam] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    setUniqueFunctionalArea(getUniqueFunctionalArea(knowledgeArticleData))
    setuniqueIssType(getuniqueIssType(knowledgeArticleData))
  }, [])

  const getUniqueFunctionalArea = knowledgeArticleData => {
    const categorys = knowledgeArticleData.map(item => item.functionalArea)
    return [...new Set(categorys)]
  }

  const getUniqueTeam = knowledgeArticleData => {
    const functionAearSubTypes = knowledgeArticleData
      .filter(item => item.functionalArea === filter)
      .map(item => item.team)

    return [...new Set(functionAearSubTypes)]
  }

  const getuniqueIssType = issueTypeData => {
    const subCategorys = issueTypeData
      .filter(item => item.functionalArea === filter && item.team === team)
      .map(item => item.IssueTypeRelation)

    return [...new Set(subCategorys)]
  }

  const getIssueType = issueTypeData => {
    const issueTypeFilter = issueTypeData.filter(
      item =>
        item.functionalArea === filter &&
        item.team === team &&
        item.IssueTypeRelation === issueTypeFilterString
    )

    let uniqueIssueType = issueTypeFilter.filter(
      (obj, index, self) =>
        index === self.findIndex(t => t.issueTypeURL === obj.issueTypeURL)
    )

    return [...new Set(uniqueIssueType)]
  }

  useEffect(() => {
    filterItems()
  }, [filter, team, issueTypeFilterString])

  useEffect(() => {
    setIssueTypeFilter("")
    setuniqueIssType(getuniqueIssType(knowledgeArticleData))
  }, [team])

  useEffect(() => {
    setTeam("")
    setIssueTypeFilter("")

    setuniqueIssType(getuniqueIssType(knowledgeArticleData))
    setUniqueIFunSub(getUniqueTeam(knowledgeArticleData))
  }, [filter])

  useEffect(() => {
    setIssueType(getIssueType(issueTypeData))
    setuniqueIssType(getuniqueIssType(knowledgeArticleData))
  }, [issueTypeFilterString])

  const filterItems = () => {
    let filteredItems = knowledgeArticleData

    if (filter) {
      filteredItems = filteredItems.filter(
        item => item.functionalArea === filter
      )
    }

    if (issueTypeFilterString) {
      filteredItems = filteredItems.filter(
        item => item.IssueTypeRelation === issueTypeFilterString
      )
    }

    if (team) {
      filteredItems = filteredItems.filter(item => item.team === team)
    }

    if (searchTerm) {
      filteredItems = filteredItems = filteredItems.filter(item =>
        item.text.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
    }

    setItems(filteredItems)
  }

  const handleMFAChange = event => {
    setFilter(event.target.value)
  }

  const handleIssueTypeChange = event => {
    setIssueTypeFilter(event.target.value)
  }

  const handleSearchChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = event => {
    event.preventDefault()
    filterItems()
  }

  const handleMFASubChange = event => {
    setTeam(event.target.value)
  }

  useEffect(() => {
    if (chosenFA !== "") {
      setFilter(chosenFA)
      setIsDisabled(true)
    }
  }, [chosenFA])

  useEffect(() => {
    if (chosenTeam !== "") {
      setTeam(chosenTeam)
    }
  }, [uniqueIssType])

  useEffect(() => {
    if (chosenTeam !== "") {
      setIssueTypeFilter(chosenIssue)
    }
  }, [issueTypeFilterString])

  // const yourBaseURL = "https://gitlab.com/"

  return (
    <>
      <div style={filterSearchContainer}>
        <div>
          <span>MFA: </span>
          <select
            value={filter}
            onChange={handleMFAChange}
            disabled={isDisabled}
          >
            <option value="">All</option>
            {uniqueFunctionalArea?.map(kaOption => (
              <option key={kaOption} value={kaOption}>
                {kaOption}
              </option>
            ))}
          </select>
        </div>

        <form
          style={{ marginBottom: 0, paddingLeft: 10 }}
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by Title"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {filter !== "" && (
        <>
          <div style={contentSize}>
            <span>MFA Team: </span>
            <select
              value={team}
              onChange={handleMFASubChange}
              disabled={isDisabled}
            >
              <option value=""></option>
              {uniqueIFunSub.map(subOption => (
                <option key={subOption} value={subOption}>
                  {subOption}
                </option>
              ))}
            </select>
          </div>
          <div style={contentSize}>
            <span>Issue Type: </span>
            <select
              value={issueTypeFilterString}
              onChange={handleIssueTypeChange}
              disabled={isDisabled}
            >
              <option value=""></option>
              {uniqueIssType?.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {isDisabled && (
        <div style={contentSize}>
          <button onClick={() => window.location.reload()}>
            Reset Filters
          </button>
        </div>
      )}

      <div style={fullBleed}>
        <div style={cardContainer}>
          {items.length > 0 ? (
            items.map((link, index) => (
              <a
                key={index}
                target="_blank"
                style={{ ...listItemStyles }}
                href={`${link.url}?utm_source=starter&utm_medium=start-page&utm_campaign=minimal-starter`}
              >
                <div>
                  <p style={linkTitle}>
                    <span style={linkeSubText}>MFA:</span> {link.functionalArea}
                  </p>
                  <p style={linkBody}>{link.text}</p>

                  <div style={btnContainer}>
                    <p style={btn}>Learn More</p>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div style={listItemStyles}>
              <p style={linkBody}>
                Please refine your search via "Issue Type" or "MFA".
              </p>{" "}
            </div>
          )}
        </div>
      </div>

      {issueTypeFilterString === "" || items.length === 0 ? (
        ""
      ) : (
        <div style={contentSize}>
          <h2 style={{ paddingTop: 20 }}>Still need help? </h2>

          <div style={{ paddingLeft: 20 }}>
            {issueType.map((link, index) => (
              <div key={index}>
                <a
                  target="_blank"
                  key={link.issueTypeURL + index}
                  // add a variable in the href and concatenate it with the link value passed from the json would be
                  // something like this: href={`${yourBaseURL + link.issueTypeURL}`}}
                  //yourBaseURL is defined above
                  href={`${link.issueTypeURL}`}
                >
                  Submit a new issue for {link.IssueTypeRelation} -{" "}
                  {link.functionalArea}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default KnowledgeArticles