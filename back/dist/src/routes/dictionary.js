"use strict";
// back/src/routes/dictionary.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dictionaryController_1 = require("../controllers/dictionaryController");
const router = (0, express_1.Router)();
router.get('/:word', dictionaryController_1.getWord);
exports.default = router;
