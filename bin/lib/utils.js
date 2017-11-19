"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const http = require("http");
const fs = require("fs");
exports.stub_test = () => {
    return "Hello DM-Tools!";
};
/** Download a file over HTTPS
 * @param uri {string} - URL of the file to download.
 * @param filename {string} - Filename to be saved as.
 * @param cb {any} - Callback function.
 * @return {void}
 */
function downloadFileHttps(uri, filename, cb) {
    const file = fs.createWriteStream(filename);
    file.on("finish", () => {
        // Safe to envoke the callback once file io is completed.
        cb();
    })
        .on("error", (err) => {
        // Delete the file async, don't check the result.
        fs.unlinkSync(filename);
        if (cb) {
            cb(err);
        }
    });
    /*const request =*/ https.get(uri, response => {
        response.on("aborted", (err) => {
            file.emit("error", err);
        });
        const SUCCESS_OK = 200;
        if (response.statusCode === SUCCESS_OK) {
            response.pipe(file);
        }
        else {
            file.emit("error", new Error(`Request Failed!\nStatus Code: ${response.statusCode}`));
        }
    });
}
exports.downloadFileHttps = downloadFileHttps;
/** Download a file over HTTP
 * @param uri {string} - URL of the file to download.
 * @param filename {string} - Filename to be saved as.
 * @param cb {any} - Callback function.
 * @return {void}
 */
function downloadFileHttp(uri, filename, cb) {
    const file = fs.createWriteStream(filename);
    file.on("finish", () => {
        // Safe to envoke the callback once file io is completed.
        cb();
    })
        .on("error", (err) => {
        // Delete the file async, don't check the result.
        fs.unlinkSync(filename);
        if (cb) {
            cb(err);
        }
    });
    /*const request =*/ http.get(uri, response => {
        response.on("aborted", (err) => {
            file.emit("error", err);
        });
        const SUCCESS_OK = 200;
        if (response.statusCode === SUCCESS_OK) {
            response.pipe(file);
        }
        else {
            file.emit("error", new Error(`Request Failed!\nStatus Code: ${response.statusCode}`));
        }
    });
}
exports.downloadFileHttp = downloadFileHttp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQStCO0FBQy9CLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFFWixRQUFBLFNBQVMsR0FBRyxHQUFXLEVBQUU7SUFDcEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0FBQzNCLENBQUMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsMkJBQW1DLEdBQVEsRUFBRSxRQUFnQixFQUFFLEVBQU87SUFDcEUsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFFLFFBQVEsQ0FBRSxDQUFDO0lBQzlDLElBQUksQ0FBQyxFQUFFLENBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtRQUN0Qix5REFBeUQ7UUFDekQsRUFBRSxFQUFFLENBQUM7SUFDUCxDQUFDLENBQUU7U0FDQSxFQUFFLENBQUUsT0FBTyxFQUFFLENBQUUsR0FBUSxFQUFHLEVBQUU7UUFDM0IsaURBQWlEO1FBQ2pELEVBQUUsQ0FBQyxVQUFVLENBQUUsUUFBUSxDQUFFLENBQUM7UUFDMUIsRUFBRSxDQUFDLENBQUUsRUFBRyxDQUFDLENBQUMsQ0FBQztZQUNULEVBQUUsQ0FBRSxHQUFHLENBQUUsQ0FBQztRQUNaLENBQUM7SUFDSCxDQUFDLENBQUUsQ0FBQztJQUVOLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFO1FBQzdDLFFBQVEsQ0FBQyxFQUFFLENBQUUsU0FBUyxFQUFFLENBQUUsR0FBUSxFQUFHLEVBQUU7WUFDckMsSUFBSSxDQUFDLElBQUksQ0FBRSxPQUFPLEVBQUUsR0FBRyxDQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFFLENBQUM7UUFFSixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDdkIsRUFBRSxDQUFDLENBQUUsUUFBUSxDQUFDLFVBQVUsS0FBSyxVQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLFFBQVEsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFFLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBRSxPQUFPLEVBQUUsSUFBSSxLQUFLLENBQUUsaUNBQWtDLFFBQVEsQ0FBQyxVQUFXLEVBQUUsQ0FBRSxDQUFFLENBQUM7UUFDOUYsQ0FBQztJQUNILENBQUMsQ0FBRSxDQUFDO0FBQ04sQ0FBQztBQTFCRCw4Q0EwQkM7QUFFRDs7Ozs7R0FLRztBQUNILDBCQUFrQyxHQUFXLEVBQUUsUUFBZ0IsRUFBRSxFQUFPO0lBQ3RFLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBRSxRQUFRLENBQUUsQ0FBQztJQUM5QyxJQUFJLENBQUMsRUFBRSxDQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUU7UUFDdEIseURBQXlEO1FBQ3pELEVBQUUsRUFBRSxDQUFDO0lBQ1AsQ0FBQyxDQUFFO1NBQ0EsRUFBRSxDQUFFLE9BQU8sRUFBRSxDQUFFLEdBQVEsRUFBRyxFQUFFO1FBQzNCLGlEQUFpRDtRQUNqRCxFQUFFLENBQUMsVUFBVSxDQUFFLFFBQVEsQ0FBRSxDQUFDO1FBQzFCLEVBQUUsQ0FBQyxDQUFFLEVBQUcsQ0FBQyxDQUFDLENBQUM7WUFDVCxFQUFFLENBQUUsR0FBRyxDQUFFLENBQUM7UUFDWixDQUFDO0lBQ0gsQ0FBQyxDQUFFLENBQUM7SUFFTixtQkFBbUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsRUFBRTtRQUM1QyxRQUFRLENBQUMsRUFBRSxDQUFFLFNBQVMsRUFBRSxDQUFFLEdBQVEsRUFBRyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBRSxDQUFDO1FBQzVCLENBQUMsQ0FBRSxDQUFDO1FBRUosTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFFLFFBQVEsQ0FBQyxVQUFVLEtBQUssVUFBVyxDQUFDLENBQUMsQ0FBQztZQUN6QyxRQUFRLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRSxDQUFDO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxJQUFJLENBQUUsT0FBTyxFQUFFLElBQUksS0FBSyxDQUFFLGlDQUFrQyxRQUFRLENBQUMsVUFBVyxFQUFFLENBQUUsQ0FBRSxDQUFDO1FBQzlGLENBQUM7SUFDSCxDQUFDLENBQUUsQ0FBQztBQUNOLENBQUM7QUExQkQsNENBMEJDIn0=