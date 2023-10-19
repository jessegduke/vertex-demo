function onMount(callback) {
	document.addEventListener('DOMContentLoaded', callback);
}

onMount(async () => {
	const widgetConfig = await lookupWidgetConfig(WIDGETID);
	ready = true
});

async function lookupWidgetConfig(widgetConfigId) {
	const url = `${ENDPOINT}/locations/${LOCATION}/lookupWidgetConfig`;
	const response = await fetch(url, {
		body: `{"widgetConfigId": "${widgetConfigId}"}`,
		method: 'POST'
	});

	return response.json();
}

async function widgetConverseConversation(widgetConfigId, input, conversationId = '-') {

	3;
	const conversationName = `projects/${PROJECT_NUMBER}/locations/${LOCATION}/collections/${COLLECTION}/dataStores/${DATA_STORE_ID}/conversations/${conversationId}`;

	if (!window.grecaptcha) {
		return undefined;
	}

	const uToken = await window.grecaptcha.execute(RECAPCHA_TOKEN, {
		action: 'WidgetService'
	});

	const url = `${ENDPOINT}/locations/${LOCATION}/widgetConverseConversation`;
	const body = JSON.stringify({
		configId: widgetConfigId,
		converseConversationRequest: {
			name: conversationName,
			query: { input: input }
		},
		conversationId: conversationId,
		additionalParams: {
			token: uToken
		}
	});
	const response = await fetch(url, {
		body: body,
		method: 'POST'
	});

	return response.json();
}


function createTitle(slug) {
	slug = slug.replace(GCS_BUCKET, '')
		.replace('https', '')
		.replace('.html', '')
		.replace('.pdf', '')
		.replace('-html', '')
		.replace('-pdf', '')
		.replaceAll('$media$', ' ')
		.replaceAll('$', '')
		.replaceAll('##', ' ')
		.replaceAll('#', ' ')
		.replaceAll('raw', ' ')
		.replaceAll('en staticpdf', ' ')
		.replace('google-github-io','')
		.replace('static-googleusercontent-com','')

	var words = slug.split("-")
	for (var i = 0; i < words.length; i++) {
		var word = words[i]
		words[i] = word.charAt(0).toUpperCase() + word.slice(1)
	}
	return words.join(" ")
	}

function  createLink(link){

	return link.replace(GCS_BUCKET, '')

			.replace('.html', '')
			.replace('.pdf', '')
			.replace('-html', '.html')
			.replace('-pdf', '.pdf')
			.replaceAll('$', '/')
			.replaceAll('#', ':')
			.replace('google-github-io','google.github.io')
			.replace('static-googleusercontent-com','static.googleusercontent.com')
}

function SearchForm() {
	return {
		formData:{
			input: "",
			placeholder: "Ask Vertex Search anything....",
			searchDisabled: false,
			buttonMessage: "Search",
			showResults: false

		},

		formMessage: "",

		searchData: {
			queries: [],
			replies: [],
			searchResults: [],
			conversationID: "-",
		},

		async doAIQuery(){
			this.searchData.queries.push(this.formData.input)
			this.formData.searchDisabled = true
			this.formData.buttonMessage = "Searching"
			const response =
				await widgetConverseConversation(WIDGETID, this.formData.input)
					.catch(() => {
						this.formMessage = "Something went wrong.";
						});
			this.formData.buttonMessage = "Search"
			this.formData.searchDisabled = false
			this.formData.input = ""
			this.formData.placeholder = "Ask a follow-up question..."
			this.searchData.conversationID = response.conversationId
			this.searchData.replies.push(response.converseConversationResponse.reply)
			this.searchData.searchResults = response.converseConversationResponse.searchResults
			this.formData.showResults = true
			window.scrollTo(0, 500)
		},

		resetForm() {
			// console.log(JSON.stringify(this.searchData));
			this.formData.input = ""
			this.formData.showResults = false
			this.formData.buttonMessage = "Search"
			this.formData.searchDisabled = false
			this.searchData.conversationID = "-"
			this.searchData.replies = []
			this.searchData.searchResults = []
			this.searchData.queries = []
			open=false
		},

		updateSearchField(text) {
			this.formData.input = text
			this.searchData.replies = []
			this.searchData.searchResults = []
			this.searchData.queries = []
			this.doAIQuery()
		}
	};
}