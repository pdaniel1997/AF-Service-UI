import React, { useEffect, useState } from "react"
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
  margin: `40px auto 20px auto`,
  maxWidth: 1080,
}

const IssueType = ({
  setChoseFA,
  setChosenTeam,
  setChosenIssue,
  setViewIt,
}) => {
  const [uniqueArray, setUniqueArray] = useState([])

  useEffect(() => {
    const removeDuplicates = (array, key) => {
      const seen = new Set()

      return array.filter(item => {
        const value = item[key]
        if (seen.has(value)) {
          return false
        } else {
          seen.add(value)
          return true
        }
      })
    }
    const uniqueItems = removeDuplicates(issueTypeData, "issueTypeURL")
    setUniqueArray(uniqueItems)
  }, [issueTypeData])

  return (
    <div style={fullBleed}>
      <div style={cardContainer}>
        <ul>
          {uniqueArray.map((issue, index) => (
            <li
              key={index}
              onClick={() => {
                setChoseFA(issue.functionalArea)
                setChosenTeam(issue.team)
                setChosenIssue(issue.IssueTypeRelation)
                setViewIt(false)
              }}
            >
              <a
                href=""
                onClick={e => {
                  e.preventDefault()
                }}
              >
                {issue.team} - {issue.IssueTypeRelation}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default IssueType