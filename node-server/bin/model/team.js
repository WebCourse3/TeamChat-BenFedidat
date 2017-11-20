"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Team = /** @class */ (function () {
    function Team(id, users) {
        this.id = id;
        this.users = users;
    }
    Team.prototype.addUser = function (userNew) {
        if (!this.users.find(function (user) { return user.id === userNew.id; })) {
            this.users.push(userNew);
        }
    };
    return Team;
}());
exports.Team = Team;
//# sourceMappingURL=team.js.map