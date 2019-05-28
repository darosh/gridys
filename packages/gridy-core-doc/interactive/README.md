---
pageClass: demo-page
---

<Demo :group="group" :code="code" />

<script>
import group from '../src/interactive'
import code from '../src/interactive.js.json'

export default {
    data: () => ({group, code})
}
</script>
