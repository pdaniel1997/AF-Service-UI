import React, { useState } from "react"

import Layout from "../components/layout"
import KnowledgeArticles from "../components/knowledgeArticle"
import IssueType from "../components/issueType"

const introContainer = {
  margin: `0 auto`,
  maxWidth: 1080,
  padding: `10px 1.0875rem 0`,
}

const footerContainer = {
  margin: `0 auto`,
  maxWidth: 1080,
  padding: `10px 1.0875rem 1.45rem`,
  marginBottom: "2px",
}

const cardContainer = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "end",
  padding: "5px",
  margin: `0 auto 20px auto`,
  maxWidth: 1080,

  "&:hover": {
    cursor: "pointer",
  },
}

const button = {
  marginBottom: "0",
}

const IndexPage = () => {
  const [viewIt, setViewIt] = useState(false)
  const [chosenFA, setChoseFA] = useState("")
  const [chosenTeam, setChosenTeam] = useState("")
  const [chosenIssue, setChosenIssue] = useState("")

  return (
    <Layout>
      <div style={introContainer}>
        {!viewIt ? (
          <h3>
            Please select the functional area and issue to see relevant
            documentation or to submit a support issue.
          </h3>
        ) : (
          <h3>
            Please select a Issue Type. This will return you to the landing page
            with updated filtering to include self help articles and ability to
            submit a support issue.
          </h3>
        )}
      </div>

      <div style={cardContainer}>
        <button onClick={() => setViewIt(prevCheck => !prevCheck)}>
          {viewIt ? (
            <p style={button}>Return</p>
          ) : (
            <p style={button}>View All Issue Types</p>
          )}
        </button>
      </div>

      {viewIt ? (
        <main>
          <IssueType
            setChoseFA={setChoseFA}
            setChosenTeam={setChosenTeam}
            setChosenIssue={setChosenIssue}
            setViewIt={setViewIt}
          />
        </main>
      ) : (
        <main>
          <KnowledgeArticles
            chosenFA={chosenFA}
            chosenTeam={chosenTeam}
            chosenIssue={chosenIssue}
          />
        </main>
      )}

      <div style={footerContainer}>
        {/* <p>Email: helpDesk@email.com</p> */}
      </div>
    </Layout>
  )
}

export default IndexPage