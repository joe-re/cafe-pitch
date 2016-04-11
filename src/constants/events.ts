export namespace EVENTS {
  export namespace MAIN_WINDOW {
    export namespace MAIN {
      export const SEND_REFRESHED_TEXT = 'MainWindow/Main/SendRefreshedText';
    }
    export namespace RENDERER {
      export const SEND_CHANGED_TEXT = 'MainWindow/Renderer/SendChangedText';
    }
  }

  export namespace PRESENTATION_WINDOW {
    export namespace RENDERER {
      export const REQUEST_START_PRESENTATION = 'PresentationWindow/Renderer/RequestStartPresentation';
      export const REQUEST_MESSAGE = 'PresentationWindow/Renderer/RequestMessage';
    }
  }

  export namespace FILE_MANAGER {
    export const READ_FILE = 'FileManager/ReadFile';
    export const RESET_FILE = 'FileManager/ResetFile';
  }
};
