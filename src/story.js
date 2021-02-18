UIBar.stow()
$(document).on(':passagerender', function(ev) {
	if(ev.passage.tags.includes('nocommands')) return
	var content = $(ev.content)
	var links = content.find('a[data-passage]').map((i,e)=>e.dataset.passage).get()
	State.setVar('_links', links.map(p=>'[['+p+']]').join(', '))
	content.wiki(Story.get('footer').text)
})
