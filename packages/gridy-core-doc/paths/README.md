---
pageClass: demo-page
---

<Demo :group="group" :code="code" />

<script>
import group from '../src/paths'
import code from '../src/paths.js.json'

export default {
    data: () => ({group, code})
}
</script>
