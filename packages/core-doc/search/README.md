---
pageClass: demo-page
---

<Demo :group="group" :code="code" />

<script>
import group from '../src/search'
import code from '../src/search.js.json'

export default {
    data: () => ({group, code})
}
</script>

