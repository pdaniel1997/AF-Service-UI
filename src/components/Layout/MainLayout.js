import React, { useState, useMemo } from 'react';
import { FaSearch } from "react-icons/fa";
import issueData from './resources/issueType.json';
import IssueCard from '../issueType/issueType';
import KnowledgeArticleCard from '../knowledgeArticles/knowledgeArticles';
import knowledgeArticles from './resources/knowledgeArticles.json';

const MainLayout = () => {
  // State variables for dropdown selections
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedMFA, setSelectedMFA] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedIssueType, setSelectedIssueType] = useState('');

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique MFA options
  const mfaOptions = useMemo(() => {
    return [...new Set(issueData.map(item => item.functionalArea).filter(Boolean))];
  }, []);

  // Extract unique Category options
  const categoryOptions = useMemo(() => {
    return [...new Set(issueData.map(item => item.issue_category).filter(Boolean))];
  }, []);

  // Filter Sub-Category options based on the selected Category
  const subCategoryOptions = useMemo(() => {
    return [...new Set(
      issueData
        .filter(item => item.issue_category === selectedCategory)
        .map(item => item.issue_subcategory)
        .filter(Boolean)
    )];
  }, [selectedCategory]);

  // Filter teams based on the selected MFA
  const mfaTeamOptions = useMemo(() => {
    return [...new Set(
      issueData
        .filter(item => item.functionalArea === selectedMFA)
        .map(item => item.team)
        .filter(Boolean)
    )];
  }, [selectedMFA]);

  // Filter issue types based on the selected MFA and selected Team
  const issueTypeOptions = useMemo(() => {
    return [...new Set(
      issueData
        .filter(item => item.functionalArea === selectedMFA && item.team === selectedTeam)
        .map(item => item.IssueTypeRelation)
        .filter(Boolean)
    )];
  }, [selectedMFA, selectedTeam]);

  // Filter the issue data based on selected filters and ensure uniqueness
  const filteredIssues = useMemo(() => {
    const filters = {};

    if (selectedCategory) filters.issue_category = selectedCategory;
    if (selectedSubCategory) filters.issue_subcategory = selectedSubCategory;
    if (!selectedCategory && selectedMFA) filters.functionalArea = selectedMFA;
    if (selectedTeam) filters.team = selectedTeam;
    if (selectedIssueType) filters.IssueTypeRelation = selectedIssueType;

    // Initial filtering based on selected filters
    const initiallyFiltered = issueData.filter(item =>
      Object.keys(filters).every(key => item[key] === filters[key])
    );

    // Ensure uniqueness based on functionalArea (MFA), team, and IssueTypeRelation
    const uniqueIssues = [];
    const seen = new Set();

    initiallyFiltered.forEach(issue => {
      const identifier = `${issue.functionalArea}|${issue.team}|${issue.IssueTypeRelation}`;
      if (!seen.has(identifier)) {
        uniqueIssues.push(issue);
        seen.add(identifier);
      }
    });

    return uniqueIssues;
  }, [selectedCategory, selectedSubCategory, selectedMFA, selectedTeam, selectedIssueType]);

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
  }, [searchQuery, selectedCategory, selectedSubCategory, selectedMFA, selectedTeam, selectedIssueType]);

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
      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          <div style={styles.leftContentContainer}>
            {/* First Sub-Column */}
            <div style={styles.leftSubColumn}>
              <h2>Search Issue by Service</h2>
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
            </div>

            {/* Second Sub-Column */}
            <div style={styles.leftSubColumn}>
              <h2>Search Issue by Team</h2>
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

        {/* Right Column */}
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
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '1.5rem',
    boxSizing: 'border-box',
  },
  mainContent: {
    display: 'flex',
    gap: '1rem',
  },
  leftColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  leftContentContainer: {
    display: 'flex',
    gap: '1rem',
  },
  leftSubColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  dropdownColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  dropdown: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  resetButton: {
    padding: '0.5rem',
    fontSize: '1rem',
    backgroundColor: '#1D2C49',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    boxSizing: 'border-box',
  },
  rightColumn: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row', // Align input and button horizontally
    gap: '0.5rem',
    alignItems: 'center',
    marginTop: '1rem',
  },
  searchBar: {
    flex: 1,
    padding: '0.5rem',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  searchButton: {
    padding: '0.5rem',
    paddingLeft: '0.75rem', // Slightly more padding on the left for spacing from the input
    paddingRight: '0.75rem', // Slightly more padding on the right
    fontSize: '0.9rem', // Smaller font size
    backgroundColor: '#1D3F49',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '2.5rem', // Consistent height with the input
  },
  issueCardsContainer: {
    backgroundColor: '#E8E8E8',
    padding: '1rem',
    marginTop: '2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
    boxSizing: 'border-box',
  },
  knowledgeArticlesContainer: {
    backgroundColor: '#E8E8E8',
    padding: '1rem',
    marginTop: '7.5rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
    boxSizing: 'border-box',
  },
};

export default MainLayout;
