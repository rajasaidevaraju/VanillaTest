const scan = require("./scan");
const dbUtil = require("./../DBUtility");
async function ScanAndPushToDB() {
  //see sample output of scanData in SampleResultFromScan.json
  let scanData = await scan.scanFolders();
  console.log("folder scanned");
  let promises = [];
  try {
    await dbUtil.ConnectWithDatabase();
    scanData.forEach(async (videoStat) => {
      try {
        promises.push(dbUtil.insertNewVideo(videoStat));
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  } finally {
    //waits till all insert queries are complete
    await Promise.all(promises);
    console.log("added to database");
    dbUtil.closeDBConnection();
  }
}

ScanAndPushToDB();
