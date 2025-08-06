"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFakerUserList = getFakerUserList;
exports.getFakerUserForm = getFakerUserForm;
exports.default = handler;
const faker_1 = require("@faker-js/faker");
function getFakerUserList(limit) {
    return Array.from({ length: Number(limit) }).map(() => ({
        number: faker_1.fakerZH_CN.number.int({ min: 1, max: 1000 }),
        fullName: faker_1.fakerZH_CN.person.fullName(),
        id: faker_1.fakerZH_CN.string.uuid(),
        sex: faker_1.fakerZH_CN.person.sex(),
        age: faker_1.fakerZH_CN.number.int({ min: 18, max: 65 }),
        email: faker_1.fakerZH_CN.internet.email(),
        phone: faker_1.fakerZH_CN.phone.number(),
        address: `${faker_1.fakerZH_CN.location.streetAddress()}, ${faker_1.fakerZH_CN.location.city()}`,
        company: faker_1.fakerZH_CN.company.name(),
        registerDate: faker_1.fakerZH_CN.date.past({ years: 10 }).toISOString().split('T')[0],
        children: Array.from({
            length: faker_1.fakerZH_CN.number.int({ min: 0, max: 3 }),
        }).map(() => ({
            number: faker_1.fakerZH_CN.number.int({ min: 2000, max: 10000 }),
            id: faker_1.fakerZH_CN.string.uuid(),
            fullName: faker_1.fakerZH_CN.person.fullName(),
            age: faker_1.fakerZH_CN.number.int({ min: 1, max: 17 }),
            sex: faker_1.fakerZH_CN.person.sex(),
        })),
    }));
}
function getFakerUserForm() {
    const hobbyList = [
        {
            value: '唱',
            label: '唱',
        },
        {
            value: '跳',
            label: '跳',
        },
        {
            value: 'Rap',
            label: 'Rap',
        },
        {
            value: '篮球',
            label: '篮球',
        },
    ];
    const jobOptions = [
        {
            label: '前端工程师',
            value: '前端工程师',
        },
        {
            label: '后端工程师',
            value: '后端工程师',
        },
        {
            label: '全栈工程师',
            value: '全栈工程师',
        },
        {
            label: '产品经理',
            value: '产品经理',
        },
        {
            label: 'UI设计师',
            value: 'UI设计师',
        },
        {
            label: '测试工程师',
            value: '测试工程师',
        },
        {
            label: '运维工程师',
            value: '运维工程师',
        },
        {
            label: '数据分析师',
            value: '数据分析师',
        },
        {
            label: '项目经理',
            value: '项目经理',
        },
        {
            label: '其他',
            value: '其他',
        },
    ];
    return {
        name: faker_1.fakerZH_CN.person.fullName(),
        age: faker_1.fakerZH_CN.number.int({ min: 10, max: 60 }),
        sex: faker_1.fakerZH_CN.person.sex(),
        hobby: [...hobbyList]
            .sort(() => Math.random() - 0.5)
            .slice(0, faker_1.fakerZH_CN.number.int({ min: 1, max: hobbyList.length }))
            .map((item) => item.value),
        phones: [
            {
                phone: faker_1.fakerZH_CN.string.numeric(11),
            },
        ],
        email: faker_1.fakerZH_CN.internet.email(),
        dateBirth: faker_1.fakerZH_CN.date.past().getTime(),
        job: jobOptions[faker_1.fakerZH_CN.number.int({ min: 0, max: jobOptions.length - 1 })].value,
        address: `${faker_1.fakerZH_CN.location.streetAddress()}, ${faker_1.fakerZH_CN.location.city()}`,
    };
}
function handler(req, res) {
    if (req.method === 'GET') {
        if (req.query.limit) {
            const limit = Number(req.query.limit) >= 300 ? 300 : Number(req.query.limit);
            return res.json({
                code: 200,
                message: 'success',
                data: getFakerUserList(limit),
            });
        }
        else {
            return res.json({
                code: 200,
                message: 'success',
                data: getFakerUserForm(),
            });
        }
    }
    return res.json({
        code: 200,
        message: 'hello world',
    });
}
