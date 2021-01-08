## [3.0.1](https://github.com/ziccardi/json-data-validator/compare/3.0.0...3.0.1) (2021-01-08)


### Bug Fixes

* package.json & package-lock.json to reduce vulnerabilities ([b0dbcc0](https://github.com/ziccardi/json-data-validator/commit/b0dbcc06a2533728f2c2689802ba9e480af4cb8f))



# [3.0.0](https://github.com/ziccardi/json-data-validator/compare/2.4.2...3.0.0) (2021-01-07)


### Bug Fixes

* 🐛 added build method ([11c9c09](https://github.com/ziccardi/json-data-validator/commit/11c9c09b3eb4656b7ae1afc0d1420b03d3e3916d))
* 🐛 fixed error message when using path ([cf2bc72](https://github.com/ziccardi/json-data-validator/commit/cf2bc7205e5771641765832e793568f7d8fc399c))
* 🐛 uniformed the builder interface to the other builders ([67d8f73](https://github.com/ziccardi/json-data-validator/commit/67d8f734755075d868fc94544aaa08ecece43ccb))


### BREAKING CHANGES

* 🧨 Now you need to call the `build` method to actually build the rule
* 🧨 Now even if this builder configures only one property, it is needed to
call the `build` method to actually build the rule



## [2.4.2](https://github.com/ziccardi/json-data-validator/compare/2.4.1...2.4.2) (2021-01-07)


### Bug Fixes

* **deps:** update dependency validator to v13.5.2 ([20cd6ff](https://github.com/ziccardi/json-data-validator/commit/20cd6fff2fdc95a10d62bd86328f52a9a1a197d3))



## [2.4.1](https://github.com/ziccardi/json-data-validator/compare/2.4.0...2.4.1) (2020-10-05)


### Bug Fixes

* **deps:** update dependency validator to v13.1.17 ([91f195c](https://github.com/ziccardi/json-data-validator/commit/91f195c35d7ff72ecb781790a3ad46003fd6f46e))



# [2.4.0](https://github.com/ziccardi/json-data-validator/compare/2.3.0...2.4.0) (2020-10-02)


### Features

* added a new 'requiredBy' rule to configure field dependencies ([3014ba1](https://github.com/ziccardi/json-data-validator/commit/3014ba18a73e0f4d386704e36c2c438a60270035))
* added parameters to the generic rule class to pass the whole form to the validator ([abd9813](https://github.com/ziccardi/json-data-validator/commit/abd98139d52a8ee609284ea46e5047b7cc017bec))



