const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;

Enzyme.configure({ adapter: new Adapter() });
