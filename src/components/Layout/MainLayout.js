import React, { useState, useMemo } from 'react';
import { FaSearch } from "react-icons/fa";
import issueData from './resources/issueType.json';
import IssueCard from '../issueType/issueType';
import KnowledgeArticleCard from '../knowledgeArticles/knowledgeArticles';
import knowledgeArticles from './resources/knowledgeArticles.json';

const MainLayout = () => {
  // State for dropdown selections (Issue section)
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedMFA, setSelectedMFA] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedIssueType, setSelectedIssueType] = useState('');

  // State for search query (Knowledge Articles section)
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique MFA options
  const mfaOptions = useMemo(() => {
    return [...new Set(issueData.map(item => item.functionalArea).filter(Boolean))];
  }, []); // Removed issueData from dependency array

  // Extract unique Category options
  const categoryOptions = useMemo(() => {
    return [...new Set(issueData.map(item => item.issue_category).filter(Boolean))];
  }, []); // Removed issueData from dependency array

  // Filter Sub-Category options based on the selected Category
  const subCategoryOptions = useMemo(() => {
    return [...new Set(
      issueData
        .filter(item => item.issue_category === selectedCategory)
        .map(item => item.issue_subcategory)
        .filter(Boolean)
    )];
  }, [selectedCategory]); // Removed issueData from dependency array

  // Filter teams based on the selected MFA
  const mfaTeamOptions = useMemo(() => {
    return [...new Set(
      issueData
        .filter(item => item.functionalArea === selectedMFA)
        .map(item => item.team)
        .filter(Boolean)
    )];
  }, [selectedMFA]); // Removed issueData from dependency array

  // Filter issue types based on the selected MFA and selected Team
  const issueTypeOptions = useMemo(() => {
    return [...new Set(
      issueData
        .filter(item => item.functionalArea === selectedMFA && item.team === selectedTeam)
        .map(item => item.IssueTypeRelation)
        .filter(Boolean)
    )];
  }, [selectedMFA, selectedTeam]); // Removed issueData from dependency array

  // Filter the issue data based on selected filters
  const filteredIssues = useMemo(() => {
    const filters = {};

    if (selectedCategory) filters.issue_category = selectedCategory;
    if (selectedSubCategory) filters.issue_subcategory = selectedSubCategory;
    if (!selectedCategory && selectedMFA) filters.functionalArea = selectedMFA;
    if (selectedTeam) filters.team = selectedTeam;
    if (selectedIssueType) filters.IssueTypeRelation = selectedIssueType;

    return issueData.filter(item =>
      Object.keys(filters).every(key => item[key] === filters[key])
    );
  }, [selectedCategory, selectedSubCategory, selectedMFA, selectedTeam, selectedIssueType]); // Removed issueData from dependency array

  // Filter the knowledge articles based on search query and selected filters
  const filteredKnowledgeArticles = useMemo(() => {
    const filteredArticles = knowledgeArticles.filter(article => {
      const matchesSearchQuery = article.text.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? article.issue_category === selectedCategory : true;
      const matchesSubCategory = selectedSubCategory ? article.issue_subcategory === selectedSubCategory : true;
      const matchesMFA = selectedMFA ? article.functionalArea === selectedMFA : true;
      const matchesTeam = selectedTeam ? article.team === selectedTeam : true;
      const matchesIssueType = selectedIssueType ? article.IssueTypeRelation === selectedIssueType : true;
      return matchesSearchQuery && matchesCategory && matchesSubCategory && matchesMFA && matchesTeam && matchesIssueType;
    });

    // Remove duplicates based on both the URL and text fields
    const uniqueArticles = [];
    const seen = new Set();

    filteredArticles.forEach(article => {
      const identifier = `${article.url}|${article.text}`;
      if (!seen.has(identifier)) {
        uniqueArticles.push(article);
        seen.add(identifier);
      }
    });

    return uniqueArticles;
  }, [searchQuery, selectedCategory, selectedSubCategory, selectedMFA, selectedTeam, selectedIssueType]); // Removed knowledgeArticles from dependency array

  // Determine whether to show issue cards based on dropdown selections
  const showIssues = selectedCategory || selectedMFA;

  // Determine whether to show knowledge articles based on search query or any filter applied
  const showKnowledgeArticles = searchQuery || selectedCategory || selectedMFA || selectedTeam || selectedIssueType;

  // Function to reset all filters
  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedMFA('');
    setSelectedTeam('');
    setSelectedIssueType('');
    setSearchQuery('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftColumn}>
        <h2>Search Issue by Service or Team</h2>
        <div style={styles.dropdownContainer}>
          <div style={styles.dropdownColumn}>
            <select
              style={styles.dropdown}
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubCategory('');
                setSelectedMFA('');
                setSelectedTeam('');
                setSelectedIssueType('');
              }}
            >
              <option value="">Select Service</option>
              {categoryOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>

            <select
              style={styles.dropdown}
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              disabled={!selectedCategory}
            >
              <option value="">Select Issue Type</option>
              {subCategoryOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            <button style={styles.resetButton} onClick={resetFilters}>
              Clear All Filters
            </button>
          </div>

          <div style={styles.dropdownColumn}>
            <select
              style={styles.dropdown}
              value={selectedMFA}
              onChange={(e) => {
                setSelectedMFA(e.target.value);
                setSelectedTeam('');
                setSelectedIssueType('');
                setSelectedCategory('');
                setSelectedSubCategory('');
              }}
              disabled={!!selectedCategory}
            >
              <option value="">Select MFA</option>
              {mfaOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>

            <select
              style={styles.dropdown}
              value={selectedTeam}
              onChange={(e) => {
                setSelectedTeam(e.target.value);
                setSelectedIssueType('');
              }}
              disabled={!selectedMFA}
            >
              <option value="">Select Team</option>
              {mfaTeamOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>

            <select
              style={styles.dropdown}
              value={selectedIssueType}
              onChange={(e) => setSelectedIssueType(e.target.value)}
              disabled={!selectedTeam}
            >
              <option value="">Select Issue Type</option>
              {issueTypeOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Render issue cards only if a dropdown is selected */}
        {showIssues && (
          <div style={styles.issueCardsContainer}>
            {filteredIssues.map((item, index) => (
              <IssueCard
                key={index}
                title={item.IssueTypeRelation}
                url={item.issueTypeURL}
                mfa={item.functionalArea}
                team={item.team}
              />
            ))}
            {filteredIssues.length === 0 && (
              <p>No issues found matching the selected criteria.</p>
            )}
          </div>
        )}
      </div>

      <div style={styles.rightColumn}>
        <h2>Search Knowledge Articles</h2>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search knowledge articles..."
            style={styles.searchBar}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button style={styles.searchButton} aria-label="Search">
            <FaSearch />
          </button>
        </div>

        {/* Render knowledge article cards only if there's a search query or any filter applied */}
        {showKnowledgeArticles && (
          <div style={styles.knowledgeArticlesContainer}>
            {filteredKnowledgeArticles.map((article, index) => (
              <KnowledgeArticleCard
                key={index}
                text={article.text}
                url={article.url}
                mfa={article.functionalArea}
                team={article.team}
              />
            ))}
            {filteredKnowledgeArticles.length === 0 && (
              <p>No articles found matching the search query or filters.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    maxWidth: '100%',
    margin: '0 auto',
    padding: '1.5rem',
    gap: '1rem',
    boxSizing: 'border-box', // Ensures padding is inside the container
  },
  leftColumn: {
    flex: 1,
    marginRight: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    boxSizing: 'border-box',
  },
  rightColumn: {
    flex: 1,
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    boxSizing: 'border-box',
  },
  dropdownContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    width: '100%',
    height: '10rem',
    alignItems: 'stretch',
    boxSizing: 'border-box',
  },
  dropdownColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    flex: 1,
    boxSizing: 'border-box',
  },
  dropdown: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  searchContainer: {
    display: 'flex',
    gap: '0.5rem',
    width: '100%',
    height: '10rem',
    alignItems: 'stretch',
    boxSizing: 'border-box',
  },
  searchBar: {
    width: '75%',
    height: '2rem',
    padding: '0.5rem',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  searchButton: {
    fontSize: '1rem',
    height: '3rem',
    backgroundColor: '#1D3F49',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
  },
  issueCardsContainer: {
    backgroundColor: '#E8E8E8',
    padding: '1rem',
    marginTop: '2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
    alignItems: 'stretch',
    gridAutoRows: '1fr', // Ensures all cards stretch to equal height
    boxSizing: 'border-box',
  },
  knowledgeArticlesContainer: {
    backgroundColor: '#E8E8E8',
    padding: '1rem',
    marginTop: '2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
    alignItems: 'stretch',
    gridAutoRows: '1fr', // Ensures all cards stretch to equal height
    boxSizing: 'border-box',
  },
  resetButton: {
    padding: '0.5rem',
    fontSize: '1rem',
    backgroundColor: '#1D2C49',
    border: 'none',
    cursor: 'pointer',
    marginTop: '1rem',
    color: 'white',
    boxSizing: 'border-box',
  },
};

export default MainLayout;
