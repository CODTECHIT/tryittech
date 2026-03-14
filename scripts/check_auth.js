const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, fileList);
    } else if (file === 'route.ts') {
      fileList.push(name);
    }
  });
  return fileList;
}

const apiDir = path.join(process.cwd(), 'src/app/api');
const routes = getFiles(apiDir);

const unprotected = [];
routes.forEach(route => {
  const content = fs.readFileSync(route, 'utf8');
  if (!content.includes('isAuthenticated') && !route.includes('auth') && !route.includes('ping') && !content.includes('verifySessionWithStore')) {
    unprotected.push(route);
  } else {
    // Check if GET is protected but others are not (though usually GET is public)
    // Actually, check if POST, PUT, DELETE are protected
    const methods = content.match(/export async function (POST|PUT|DELETE)/g);
    if (methods) {
        // Simple check: does each block corresponding to these methods have isAuthenticated?
        // This is harder to do perfectly with regex but we can check if the count matches or similar
    }
  }
});

console.log('--- POTENTIALLY UNPROTECTED ROUTES (MISSING IMPORT) ---');
console.log(unprotected.join('\n'));

console.log('\n--- CHECKING FOR MISSING CALLS IN METHODS ---');
routes.forEach(route => {
  const content = fs.readFileSync(route, 'utf8');
  if (route.includes('auth') || route.includes('ping')) return;

  const methods = ['POST', 'PUT', 'DELETE'];
  methods.forEach(method => {
    const methodIndex = content.indexOf(`export async function ${method}`);
    if (methodIndex !== -1) {
       // Find the next block
       const nextMethodIndex = content.slice(methodIndex + 20).search(/export async function (GET|POST|PUT|DELETE)/);
       const methodBlock = nextMethodIndex === -1 ? content.slice(methodIndex) : content.slice(methodIndex, methodIndex + 20 + nextMethodIndex);
       
       if (!methodBlock.includes('isAuthenticated') && !methodBlock.includes('verifySessionWithStore')) {
          console.log(`MISSING AUTH CALL in ${method} @ ${route}`);
       }
    }
  });
});
