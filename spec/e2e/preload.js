const { dialog } = require('electron');
function mockShowSaveDialog() {
  return 'sandbox/test.md';
};

dialog.showSaveDialog = mockShowSaveDialog;
