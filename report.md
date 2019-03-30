## Design
With the analysis of the business model and the feedback from our potential customers, we design our Future OKR. Actually, at first, we thought a real-time collaborative OKR software would meet the customers' taste. We made a prototype using Firebase as backend and implemented operational transformation algorithm to support real-time collaboration. The prototype was presented to whoever was taking our survey. However, our guess was wrong. The real-time collaborative feature is not necessary or even useful in most cases. During the implicit investigation, we finally decided to choose conversational user interface as our main feature.

Converting into the conversational user interface, we have to redesign every the whole process of customers' use. The traditional user interface requires user click and type, while there won't be any visual components to interact with our product. We should redesign procedure of the application under the conversation way. The conversation is turn taking, threading and full of hidden information in every message. We need to leverage the inherent efficiency of language and anticipate variable user behavior. According to Google, the behavior should be cooperative.

We designed a lot of cases which cover most of the OKR usage. Imagining our product as a real assistant, how will it respond when their master let them do anything in OKR? We picked proper use cases which are simple and intuitive. Based on the analysis of the functionality of traditional OKR software, we chose CRUD(Create, Retrieve, Update, Delete) as the major use cases we will cover.

The second step of creating Future OKR is creating a persona. We defined our OKR assistant as a steady, encourage character, speaking a formal and mild accent. In the future, the customer would be able to customize the language and accent. A good persona can help us build our brand, make familiar with customers and help us write our conversations.

After that, we wrote dialogs to feed the natural language processing model, in order to let it recognize the intent of the users' talk. The dialogs were a single way without branches, but with context triggering, we can connect the dialogs to a complete network which allows the user traverse among the states. To cover most of the cases the number of dialogs was huge. For each intent, we need to anticipate every possible sentence structure the user may speak. 

Then we tested the model, and it was quite good. And it was very great when the word we used in testing could be immediately used in the model. That means, our model keeps learning. Every time it fails, it improves.

The technical architect is simple. We would use cloud hosting and we chose cloud service to run the NLP model and we decide to put voice recognition and speech synthesis in the front end part. 

## Implementation
The service contains three core parts: frontend, natural language processing backend, and database backend. Besides, we also need to use Godaddy as name service, and Google App Engine to host the static files and serve CDN.

Thanks to the Web speech API we can allow the user to do the voice recognition and speech synthesis from the front end side. We also implemented hotword spotting so that the user can invoke our application by just calling the product name "Future". During the speech synthesis time, the voice recognition is disabled, or the application will talk to itself which can be very funny. 

Comparing the price and performance of available cloud service on the market, we chose Dialogflow, which has the highest recognition rate during our test, and comparably low price. Dialogflow allows us to use machine learning to distract intents from the texts. We added all the intents and fed the model with all our designed dialogs. We connected the intents with contextual information. Besides, we also took use of smalltalk from Google which covers most of the cases irrelevant from OKR but might also be asked by the customer.

We store the data in Google Firebase real-time database, which support real-time syncing for JSON data between different devices. For this part, we reused the previous code for real-time collaborative OKR software prototype. It saved us a lot of time and made the final application also support some real-time collaboration.

When the user says something to our application, the browser recognizes what the user says and turn into text, then send the text to the dialogflow. The dialogflow service will return a JSON object which includes which intent is matched. According to what is returned, the browser will manipulate the database, and the result will finally present as voice so that the user can listen. 

## Evaluation
### Usability
The OKR functionality has its promise by unit testing and the whole front end has its own end to end testing. So the only uncertain part is the voice control. 
During our test on voice recognition, we found it quite accurate in a quiet environment(However, it didn't work well in the presentation). The hotword spotting also works fine. It can be invoked when the people discuss and suddenly talk to Future OKR. 

### Availability
The availability relies on Google's service and internet service providers. 

### User experience
In our survey, the potential customers were surprised by our demonstration and were excited about the future of human-computer interfaces. However, we think the surprising or fancy part hidden the lack of accuracy. The curiosity drives users to give more tries. The user experience is too new to assess.

### What to improve
The accuracy of recognition is the first thing to improve. What's more, we should support more languages and more functionalities. And it also needs some time for the model to learn new phases, which is fed by the customers. We believe it will have a very bright future. 