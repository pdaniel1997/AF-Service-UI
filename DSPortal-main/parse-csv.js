const fs = require('fs');
const path = require('path');

let knowledgeArticleData = [];
let issueTypeData = [];
let idx = 0;

const SD_LINK="https://gitlab.kesselrun.us/kr/adcp/integration/dev-support-service-desk/-/issues/new"

console.log("parse-csv is running");

try {
    const files = fs.readdirSync( "./dev-support-templates/");
    console. log('Files and folders in the directory:', files);
    
    files.map(file => {
        if (path.extname(file) == ".csv") {
            let filePath =  `./dev-support-templates/${file}`;
            console.log("knowledgeArticleData::file path:", filePath);
            let fdata = fs.readFileSync(filePath);
            let lines = fdata.toString().split('\n');
            //first line is header, skip it
            for (let i = 1; i < lines.length; i++) {
                let cols = lines[i].split(",");
                //mfa,team,issue_template,issue_name,doc_desc,doc_url
                knowledgeArticleData.push({'functionalArea':cols[0],'team': cols[1],'IssueTypeRelation': cols[3],'text': cols[4],'url': cols[5]});
                // let issueTemplateUrl = `${SD_LINK}?issuable_template=${cols[2]}`
                let issueTemplateUrl = `${SD_LINK}?issue[title]=${cols[0]} ${cols[1]} ${cols[3]}&issuable_template=${cols[2]}`
                issueTypeData.push({'functionalArea':cols[0],'team': cols[1],'IssueTypeRelation': cols[3],'issueTypeURL': issueTemplateUrl});
            };
        }
    });

    const kdata = JSON.stringify(knowledgeArticleData);
    const idata = JSON.stringify(issueTypeData);

    // writing the JSON string content to a file
    fs.writeFile("./src/pages/resources/knowledgeArticles2.json", kdata, (error) => {
        if (error) {
            console.error(error);
            throw error;
        }
        console.log("knowledgeArticles.json written correctly");
    });

    fs.writeFile("./src/pages/resources/issueType2.json", idata, (error) => {
        if (error) {
            console.error(error);
            throw error;
        }

        console.log("issueType.json written correctly");
    });

} catch (error) {
    console.error(error);
}