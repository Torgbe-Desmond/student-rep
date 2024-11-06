import fs  from 'fs';
import  src  from './src';


fs.readdirSync(src).forEach(file=>{

    if(file !== 'node_modules'){

        const filePath = `${src}/${file}`;
        const destPath = `${dest}/${file}`;

        if(fs.lstatSync(filePath).isDirectory()){
            fs.mkdirSync(destPath);
        } else {
            if(!fs.existsSync(destPath)){
                fs.copyFileSync(filePath,destPath)
            } 
         }
    }
})