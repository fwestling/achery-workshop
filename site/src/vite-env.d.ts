/// <reference types="vite/client" />

declare module 'virtual:native-story-index' {
  const index: import('../plugins/storyIndex').StoryIndexEntry[]
  export default index
}
