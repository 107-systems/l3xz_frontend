/***************************************************************
This software is distributed under the terms of the MIT License.
Copyright (c) 2022 107-Systems
Author: Jonas Wühr (jonaswuehrmaintainer@gmail.com)
****************************************************************/
class Topic {
    constructor(name, type, visualizers) {
        this.name = name;
        this.type = type;
        this.subscribed = false;
        this.visualizers = visualizers;

        this.listener = new ROSLIB.Topic({
            ros: ros,
            name: this.name,
            messageType: this.type
        });
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }

    subscribe() {
        let name = this.name;
        let type = this.type;
        this.subscribed = true;
        let vis = this.visualizers;
        this.listener.subscribe(function(message) {
            for (let v = 0; v < vis.length; v++) {
                vis[v].updateMessage(name, type, message);
            }
        });
    }

    unsubscribe() {
        this.subscribed = false;
        this.listener.unsubscribe();
    }
}

class TopicsManager {
    constructor(update) {
        this.topics = [];
        this.currentTopic = 0;
        this.visualizers = [];
        this.update = update;
    }

    appendVisualizer(vis) {
        this.visualizers.push(vis);
    }

    updateTopics(nameAndTypeList2d) {
        this.topics = [];
        for (let i in nameAndTypeList2d.topics) {
            this.topics[i] = new Topic(nameAndTypeList2d.topics[i], nameAndTypeList2d.types[i], this.visualizers);
        }
        if (this.update) {
            select_topic_refresh();
        }
    }

    getAllTopicDescriptions() {
        let descriptions = [];
        for (let i in this.topics) {
            let optGroup = String(this.topics[i].getType());

            if (descriptions[optGroup] === undefined) {
                descriptions[optGroup] = [];
            }

            let name = String(this.topics[i].getName())
            let curr = [parseInt(i), name];
            descriptions[optGroup].push(curr);
        }
        return descriptions;
    }

    unsubscribeAll() {
        let t = 0;
        for (t in this.topics) {
            this.topics[t].unsubscribe();
        }
    }

    subscribeTopic(listIndex) {
        this.unsubscribeAll();
        this.currentTopic = listIndex;
        this.topics[listIndex].subscribe();
    }

    getName(listIndex) {
        return this.topics[listIndex].getName();
    }

    subscribeTopics(listIndices) {
        this.unsubscribeAll();
        for (let i in listIndices) {
            this.currentTopic = listIndices[i];
            this.topics[listIndices[i]].subscribe();
        }
    }

    subscribeRequiredTopics() {
        let topics = this.getAllTopicDescriptions();
        let subscribed = [];
        for (let i in topics) {
            let current = topics[i];
            for (let k in current) {
                let topic = current[k];
                for (let v = 0; v < this.visualizers.length; v++) {
                    let required = this.visualizers[v].getRequiredMessages();
                    if (required.includes(topic[1])) {
                        if (!subscribed.includes(topic[0])) {
                            subscribed.push(topic[0]);
                        }
                    }
                }
            }
        }
        this.subscribeTopics(subscribed);
    }
}
