import path from "path";
import { fileURLToPath } from "url";

const __fileNamePublic = fileURLToPath (import.meta.url);
//console.log (`la ruta del archivo es ${__fileNamePublic}`)

const __dirNamePublic = path.dirname(__fileNamePublic);
//console.log (__dirNamePublic);

export default __dirNamePublic





//para ejecutar hago >>  node src/public/publicDirName.js