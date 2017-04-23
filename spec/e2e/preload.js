const { dialog } = require('electron');
function mockShowSaveDialog() {
  return 'sandbox/test.md';
};

function mockShowOpenDialog() {
  return [ 'sandbox/test.md' ];
};

dialog.showSaveDialog = mockShowSaveDialog;
dialog.showOpenDialog = mockShowOpenDialog;