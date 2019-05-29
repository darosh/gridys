---
pageClass: demo-page
---

<Demo :group="group" :code="code" />

<script>
import group from '../src/selection'
import code from '../src/selection.js.json'

export default {
    data: () => ({group, code})
}
</script>
