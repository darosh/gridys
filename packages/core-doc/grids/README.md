---
pageClass: demo-page
---

<Demo :group="group" :code="code" />

<script>
import group from '../src/grids'
import code from '../src/grids.js.json'

export default {
    data: () => ({group, code})
}
</script>
