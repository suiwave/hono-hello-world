import { describe, it, expect } from "vitest";
import { app } from "../src/index.js";
import { testClient } from "hono/testing";

describe('APIリクエストのバリデーション', () => {
    it.todo('必須パラメータが想定された形式であること', async () => { });
    it('パラメータの型が不正な場合は400エラーを返す', async () => {
        // 準備
        const userId = 123
        const title = "aaa"

        // 実行
        // testClient経由だと型補完で欠けたbodyを書けないので、requestメソッドを使用する
        const res = await app.request('/article', {
            method: 'POST',
            body: JSON.stringify({
                // userId,
                // title,
            }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        // 検証
        expect(res.status).toEqual(400)
        expect(await res.text()).toEqual(`invalid request`)
    });
    it.todo('パラメータの値が許容範囲外の場合は400エラーを返す', async () => { });
    it.todo('不正なJSON形式のリクエストボディの場合は400エラーを返す', async () => { });
});

describe('認証・認可', () => {
    it.todo('認証トークンがない場合は401エラーを返す', async () => { });
    it.todo('無効な認証トークンの場合は401エラーを返す', async () => { });
    it.todo('トークンの有効期限切れの場合は401エラーを返す', async () => { });
    it.todo('アクセス権限がない場合は403エラーを返す', async () => { });
});

describe('レスポンス形式', () => {
    it('正常系レスポンスが指定された形式で返される', async () => {
        //準備
        //実行
        const res = await testClient(app).index.$get({
            query: {
                limit: "50"
            }
        })

        //確認
        expect(await res.text()).toEqual('Hello Hono!')
    });
    it('エラーレスポンスが指定された形式で返される', async () => {
        //準備
        //実行
        const res = await testClient(app).index.$get({
            query: {
                limit: "-1"
            }
        })

        //確認
        expect(res.status).toEqual(400)
        expect(await res.text()).toEqual("Number must be greater than 0")
    });
    it.todo('レスポンスヘッダーが適切に設定される', async () => { });
});

describe('セキュリティ', () => {
    it.todo('SQLインジェクション対策が機能する', async () => { });
    it.todo('XSS対策が機能する', async () => { });
    it.todo('CSRFトークンが正しく機能する', async () => { });
    it.todo('レートリミットが正しく機能する', async () => { });
});