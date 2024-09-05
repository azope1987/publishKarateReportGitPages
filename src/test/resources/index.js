var reporter = require('cucumber-html-reporter');
var JSZip = require('jszip');
var fs = require('fs');


var options = {
        theme: 'bootstrap',
        jsonDir: process.argv[2]+'/target/karate-reports',
        output: process.argv[2]+'/target/cucumber-html-reports/index.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        name: process.argv[3]+' Test Report',
        brandTitle:'Identifi',
        columnLayout:2,
        scenarioTimestamp: true,
        failedSummaryReport: true,
        metadata: {
            "App": process.argv[3],
            "Test Environment": process.argv[4],
            "Browser": process.argv[5],
            "Parallel": "Scenarios",
            "Executed": "Remote"
        }
    };
    console.log("options are ", options);
    reporter.generate(options);
    try{
        var zip = new JSZip();
        const htmlData = fs.readFileSync(process.argv[2]+'/target/cucumber-html-reports/index.html');
        zip.file('Demo_Automation_'+process.argv[3]+'.html', htmlData);
        zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true,compression: "DEFLATE",compressionOptions: {level: 9} })
        .pipe(fs.createWriteStream(process.argv[2]+'/target/Demo_Automation_'+process.argv[3]+'.zip'))
        .on('finish', function () {
            console.log(process.argv[2]+'/target/Demo_Automation_'+process.argv[3]+'.zip written.');
        });
    }
    catch (err) {
        console.error(err)
    }
    

    /**
     * process.argv - command line arguments for node.js file
     * process.argv[2] - report json directory path
     * process.argv[3] - Application name like 'Care Management','Review' etc
     * process.argv[4] - Test Environment like 'QA','UAT' etc
     * process.argv[5] - Browser name  
     * 
    **/
    
