import {
    describe,
    test,
    expect,
    jest
} from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js'

import Routes from './../../src/routes.js'

describe('#FileHelper', () => {

    describe('#getFileStatus', () => {
        test('it should return files statuses in correct format', async () => {
            const statMock = {
                dev: 16777220,
                mode: 33188,
                nlink: 1,
                uid: 501,
                gid: 20,
                rdev: 0,
                blksize: 4096,
                ino: 18281150,
                size: 282423,
                blocks: 552,
                atimeMs: 1630983873393.8608,
                mtimeMs: 1630983873364.4016,
                ctimeMs: 1630983873364.8486,
                birthtimeMs: 1630983873349.962,
                atime: '2021-09-07T03:04:33.394Z',
                mtime: '2021-09-07T03:04:33.364Z',
                ctime: '2021-09-07T03:04:33.365Z',
                birthtime: '2021-09-07T03:04:33.350Z'
            }

            const mockUser = 'me'
            process.env.USER = mockUser
            const filename = 'file.pdf'

            jest.spyOn(fs.promises, fs.promises.readdir.name)
                .mockResolvedValue([filename])
            
            jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(statMock)
            
            const result = await FileHelper.getFilesStatus("/tmp")

            const expectedResult = [
                {
                    size: "282 kB",
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: filename
                }
            ]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectedResult)
        })
    })
})