# A Node-Red plugin for working the the Prediktor EDGE (APIS)

This set of nodes allows you to interact with a Prediktor EDGE (APIS). Currently, the focus is on the use of the Config Repository.

### What is Node-Red?
[Read more at the Official Site](https://nodered.org/)

### What is Prediktor APIS/EDGE?
[Read more at the Prediktor Documentation Site](https://docs.prediktor.com)

### The Config Repository Plugin
[Read more at the GitHub Project page](https://github.com/PrediktorAS/node-red-contrib-prediktor-config-repo)

## Sample flow

    [ {"id":"125debb98066f2a3","type":"tab","label":"Test Edge Management","disabled":false,"info":""},{"id":"3a87fc228d4146cd","type":"ping","z":"125debb98066f2a3","name":"","server":"9a73253fb9a1a93e","x":610,"y":240,"wires":[["fcd9f28f63154261"]]},{"id":"7b351803e89c8d1a","type":"inject","z":"125debb98066f2a3","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":420,"y":240,"wires":[["3a87fc228d4146cd"]]},{"id":"fcd9f28f63154261","type":"debug","z":"125debb98066f2a3","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":890,"y":240,"wires":[]},{"id":"4cde8cbe86ff8aef","type":"restore-namespace","z":"125debb98066f2a3","name":"","server":"9a73253fb9a1a93e","configRepoUri":"cr://10.100.86.237:8237","namespaceUri":"http://bkk.no/Sites/Dale","revisionId":"123","checkMethods":["All nodes shall be referenced atleast once in addition to typedef reference","All nodes shall have a typedef reference","All nodes in references and datatypes shall exist"],"overrideErrors":true,"isNodeSetChanges":true,"hiveName":"ApisHive","x":660,"y":320,"wires":[["f4681ac27bd4218c"]]},{"id":"2a0d558adf47995f","type":"inject","z":"125debb98066f2a3","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":420,"y":320,"wires":[["4cde8cbe86ff8aef"]]},{"id":"f4681ac27bd4218c","type":"debug","z":"125debb98066f2a3","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","statusVal":"","statusType":"auto","x":870,"y":320,"wires":[]},{"id":"9a73253fb9a1a93e","type":"prediktor-edge-management","host":"10.100.86.237","port":"7823"} ]

## Install

`npm i node-red-contrib-prediktor-edge-management` or through the Node-Red palette
