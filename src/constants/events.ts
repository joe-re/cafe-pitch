export namespace EVENTS {
  export namespace MAIN_WINDOW {
    export const CHANGE_TEXT = 'MainWindow/ChangeText';
  }

  export namespace PRESENTATION_WINDOW {
    export const REQUEST_START_PRESENTATION = 'PresentationWindow/RequestStartPresentation';
    export const REQUEST_MESSAGE = 'PresentationWindow/RequestMessage';
  }

  export namespace FILE_MANAGER {
    export const READ_FILE = 'FileManager/ReadFile';
    export const RESET_FILE = 'FileManager/ResetFile';
  }
};
