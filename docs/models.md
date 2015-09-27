# Copper Mantis Data Models

## Content Model

### Base Schema

```javascript
{
	id: 'mongo id',
	title: '(string) Human readable id',
	creationTimestamp: '(Date)',
	updateTimestamp: '(Date)',
	owner: '(string) username',
	type: '(string)'
	content: '(string)'
	status: '',
	meta: {
		value: ''
	},
	attachment: [
		{id: ''},
		{in: []},
		{out: []}
	]
}
```
