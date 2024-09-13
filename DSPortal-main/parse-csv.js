const fs = require('fs');
const path = require('path');

let knowledgeArticleData = [];
let issueTypeData = [];

const SD_LINK = "https://gitlab.kesselrun.us/kr/adcp/integration/dev-support-service-desk/-/issues/new";

console.log("parse-csv is running");

try {
    const directoryPath = path.join(__dirname, './dev-support-templates/');
    const files = fs.readdirSync(directoryPath);
    console.log('Files and folders in the directory:', files);

    files.forEach(file => {
        if (path.extname(file) === ".csv") {
            const filePath = path.join(directoryPath, file);
            console.log("knowledgeArticleData::file path:", filePath);

            const fileData = fs.readFileSync(filePath, 'utf8');
            const lines = fileData.toString().split('\n').filter(Boolean); // Remove empty lines

            // Skip the header line
            for (let i = 1; i < lines.length; i++) {
                const cols = lines[i].split(",").map(col => col.trim());

                if (cols.length >= 6) {  // Ensure there are enough columns
                    knowledgeArticleData.push({
                        'functionalArea': cols[0],
                        'team': cols[1],
                        'IssueTypeRelation': cols[3],
                        'text': cols[4],
                        'url': cols[5]
                    });

                    const issueTemplateUrl = `${SD_LINK}?issue[title]=${encodeURIComponent(cols[0])} ${encodeURIComponent(cols[1])} ${encodeURIComponent(cols[3])}&issuable_template=${encodeURIComponent(cols[2])}`;
                    issueTypeData.push({
                        'functionalArea': cols[0],
                        'team': cols[1],
                        'IssueTypeRelation': cols[3],
                        'issueTypeURL': issueTemplateUrl
                    });
                } else {
                    console.warn(`Skipping line ${i} in file ${file}: not enough columns.`);
                }
            }
        }
    });

    const kdataPath = path.join(__dirname, "./src/pages/resources/knowledgeArticles2.json");
    const idataPath = path.join(__dirname, "./src/pages/resources/issueType2.json");

    fs.writeFileSync(kdataPath, JSON.stringify(knowledgeArticleData, null, 2), 'utf8');
    console.log("knowledgeArticles2.json written correctly");

    fs.writeFileSync(idataPath, JSON.stringify(issueTypeData, null, 2), 'utf8');
    console.log("issueType2.json written correctly");

} catch (error) {
    console.error("Error processing files:", error);
}
