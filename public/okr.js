const db = firebase.initializeApp({
  apiKey: 'AIzaSyBLwH3JGapMY3EYqEPDT0lAizv5v_7_zZc',
  authDomain: 'future-okr.firebaseapp.com',
  databaseURL: 'https://future-okr.firebaseio.com',
  projectId: 'future-okr',
  storageBucket: 'future-okr.appspot.com',
  messagingSenderId: '757700235440',
}).database();
const objectivesRef = db.ref('objectives');

const vm = new Vue({
  el: '#main',
  data: {
    newObjectiveTitle: '',
    showing: false,
  },
  firebase: {
    objectives: objectivesRef.limitToLast(25),
  },
  methods: {
    addObjective() {
      if (this.newObjectiveTitle) {
        objectivesRef.push({
          title: this.newObjectiveTitle,
          keyResults: [],
          newKeyResultContent: '',
        });
        this.newObjectiveTitle = '';
      }
    },
    updateObjectiveTitle(objective, newTitle) {
      objectivesRef.child(objective['.key']).child('title').set(newTitle);
    },
    removeObjective(objective) {
      objectivesRef.child(objective['.key']).remove();
    },
    addKeyResult(objective) {
      if(objective.newKeyResultContent) {
        objectivesRef.child(objective['.key']).child('keyResults').push({
          content: objective.newKeyResultContent,
        });
        objectivesRef.child(objective['.key']).child('newKeyResultContent').set('');
      }
    },
    updateKeyResultContent(objective, keyResult, newContent) {
      keyResultKey = Object.keys(objective.keyResults).filter(key => objective.keyResults[key] === keyResult)[0];
      objectivesRef.child(objective['.key']).child('keyResults').child(keyResultKey).child('content').set(newContent);
    },
    removeKeyResult(objective, keyResult) { 
      keyResultKey = Object.keys(objective.keyResults).filter(key => objective.keyResults[key] === keyResult)[0];
     objectivesRef.child(objective['.key']).child('keyResults').child(keyResultKey).remove();
    },
  },
});

const okr = {
  addObjective(objective) {
    vm.newObjectiveTitle = objective;
    vm.addObjective();
  },
  updateObjective(objectiveId, newObjective) {
  },
  removeObjective(objectiveId) {
  },
  addKeyResult(objective, keyResult) {
    const obj = vm.objectives.filter(x => x.title === objective)[0];
    obj.newKeyResultContent = keyResult.join(', ');
    vm.addKeyResult(obj);
  },
  updateKeyResult(objectiveId, keyResultId, newKeyResult) {
  },
  removeKeyResult(objectiveId, keyResultId) { 
  },
};
