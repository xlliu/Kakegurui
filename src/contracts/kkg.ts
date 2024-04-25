import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Player = {
    $$type: 'Player';
    addr: Address;
    choice: bigint | null;
    ready: boolean;
}

export function storePlayer(src: Player) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.addr);
        if (src.choice !== null && src.choice !== undefined) { b_0.storeBit(true).storeUint(src.choice, 8); } else { b_0.storeBit(false); }
        b_0.storeBit(src.ready);
    };
}

export function loadPlayer(slice: Slice) {
    let sc_0 = slice;
    let _addr = sc_0.loadAddress();
    let _choice = sc_0.loadBit() ? sc_0.loadUintBig(8) : null;
    let _ready = sc_0.loadBit();
    return { $$type: 'Player' as const, addr: _addr, choice: _choice, ready: _ready };
}

function loadTuplePlayer(source: TupleReader) {
    let _addr = source.readAddress();
    let _choice = source.readBigNumberOpt();
    let _ready = source.readBoolean();
    return { $$type: 'Player' as const, addr: _addr, choice: _choice, ready: _ready };
}

function storeTuplePlayer(source: Player) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.addr);
    builder.writeNumber(source.choice);
    builder.writeBoolean(source.ready);
    return builder.build();
}

function dictValueParserPlayer(): DictionaryValue<Player> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePlayer(src)).endCell());
        },
        parse: (src) => {
            return loadPlayer(src.loadRef().beginParse());
        }
    }
}

export type CountRes = {
    $$type: 'CountRes';
    roomId: bigint;
    count: bigint;
    player1: Player | null;
    player2: Player | null;
}

export function storeCountRes(src: CountRes) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.roomId, 257);
        b_0.storeInt(src.count, 257);
        if (src.player1 !== null && src.player1 !== undefined) { b_0.storeBit(true); b_0.store(storePlayer(src.player1)); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        if (src.player2 !== null && src.player2 !== undefined) { b_1.storeBit(true); b_1.store(storePlayer(src.player2)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadCountRes(slice: Slice) {
    let sc_0 = slice;
    let _roomId = sc_0.loadIntBig(257);
    let _count = sc_0.loadIntBig(257);
    let _player1 = sc_0.loadBit() ? loadPlayer(sc_0) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _player2 = sc_1.loadBit() ? loadPlayer(sc_1) : null;
    return { $$type: 'CountRes' as const, roomId: _roomId, count: _count, player1: _player1, player2: _player2 };
}

function loadTupleCountRes(source: TupleReader) {
    let _roomId = source.readBigNumber();
    let _count = source.readBigNumber();
    const _player1_p = source.readTupleOpt();
    const _player1 = _player1_p ? loadTuplePlayer(_player1_p) : null;
    const _player2_p = source.readTupleOpt();
    const _player2 = _player2_p ? loadTuplePlayer(_player2_p) : null;
    return { $$type: 'CountRes' as const, roomId: _roomId, count: _count, player1: _player1, player2: _player2 };
}

function storeTupleCountRes(source: CountRes) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.roomId);
    builder.writeNumber(source.count);
    if (source.player1 !== null && source.player1 !== undefined) {
        builder.writeTuple(storeTuplePlayer(source.player1));
    } else {
        builder.writeTuple(null);
    }
    if (source.player2 !== null && source.player2 !== undefined) {
        builder.writeTuple(storeTuplePlayer(source.player2));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserCountRes(): DictionaryValue<CountRes> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCountRes(src)).endCell());
        },
        parse: (src) => {
            return loadCountRes(src.loadRef().beginParse());
        }
    }
}

export type CountsRes = {
    $$type: 'CountsRes';
    roomId: bigint;
    countRes: Dictionary<bigint, CountRes>;
}

export function storeCountsRes(src: CountsRes) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.roomId, 257);
        b_0.storeDict(src.countRes, Dictionary.Keys.BigInt(257), dictValueParserCountRes());
    };
}

export function loadCountsRes(slice: Slice) {
    let sc_0 = slice;
    let _roomId = sc_0.loadIntBig(257);
    let _countRes = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserCountRes(), sc_0);
    return { $$type: 'CountsRes' as const, roomId: _roomId, countRes: _countRes };
}

function loadTupleCountsRes(source: TupleReader) {
    let _roomId = source.readBigNumber();
    let _countRes = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserCountRes(), source.readCellOpt());
    return { $$type: 'CountsRes' as const, roomId: _roomId, countRes: _countRes };
}

function storeTupleCountsRes(source: CountsRes) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.roomId);
    builder.writeCell(source.countRes.size > 0 ? beginCell().storeDictDirect(source.countRes, Dictionary.Keys.BigInt(257), dictValueParserCountRes()).endCell() : null);
    return builder.build();
}

function dictValueParserCountsRes(): DictionaryValue<CountsRes> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCountsRes(src)).endCell());
        },
        parse: (src) => {
            return loadCountsRes(src.loadRef().beginParse());
        }
    }
}

export type Game = {
    $$type: 'Game';
    player1: Player;
    player2: Player | null;
    betAmount: bigint;
    currentBetAmount: bigint;
    status: bigint;
    creater: Address;
    win_addr: Address | null;
    lose_addr: Address | null;
    win_last_addr: Address | null;
    current_count: bigint;
    count: bigint;
    lose_stop: boolean;
    finish: boolean;
}

export function storeGame(src: Game) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.store(storePlayer(src.player1));
        if (src.player2 !== null && src.player2 !== undefined) { b_0.storeBit(true); b_0.store(storePlayer(src.player2)); } else { b_0.storeBit(false); }
        b_0.storeUint(src.betAmount, 256);
        let b_1 = new Builder();
        b_1.storeUint(src.currentBetAmount, 256);
        b_1.storeUint(src.status, 256);
        b_1.storeAddress(src.creater);
        let b_2 = new Builder();
        b_2.storeAddress(src.win_addr);
        b_2.storeAddress(src.lose_addr);
        b_2.storeAddress(src.win_last_addr);
        b_2.storeUint(src.current_count, 8);
        b_2.storeUint(src.count, 8);
        b_2.storeBit(src.lose_stop);
        b_2.storeBit(src.finish);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGame(slice: Slice) {
    let sc_0 = slice;
    let _player1 = loadPlayer(sc_0);
    let _player2 = sc_0.loadBit() ? loadPlayer(sc_0) : null;
    let _betAmount = sc_0.loadUintBig(256);
    let sc_1 = sc_0.loadRef().beginParse();
    let _currentBetAmount = sc_1.loadUintBig(256);
    let _status = sc_1.loadUintBig(256);
    let _creater = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _win_addr = sc_2.loadMaybeAddress();
    let _lose_addr = sc_2.loadMaybeAddress();
    let _win_last_addr = sc_2.loadMaybeAddress();
    let _current_count = sc_2.loadUintBig(8);
    let _count = sc_2.loadUintBig(8);
    let _lose_stop = sc_2.loadBit();
    let _finish = sc_2.loadBit();
    return { $$type: 'Game' as const, player1: _player1, player2: _player2, betAmount: _betAmount, currentBetAmount: _currentBetAmount, status: _status, creater: _creater, win_addr: _win_addr, lose_addr: _lose_addr, win_last_addr: _win_last_addr, current_count: _current_count, count: _count, lose_stop: _lose_stop, finish: _finish };
}

function loadTupleGame(source: TupleReader) {
    const _player1 = loadTuplePlayer(source.readTuple());
    const _player2_p = source.readTupleOpt();
    const _player2 = _player2_p ? loadTuplePlayer(_player2_p) : null;
    let _betAmount = source.readBigNumber();
    let _currentBetAmount = source.readBigNumber();
    let _status = source.readBigNumber();
    let _creater = source.readAddress();
    let _win_addr = source.readAddressOpt();
    let _lose_addr = source.readAddressOpt();
    let _win_last_addr = source.readAddressOpt();
    let _current_count = source.readBigNumber();
    let _count = source.readBigNumber();
    let _lose_stop = source.readBoolean();
    let _finish = source.readBoolean();
    return { $$type: 'Game' as const, player1: _player1, player2: _player2, betAmount: _betAmount, currentBetAmount: _currentBetAmount, status: _status, creater: _creater, win_addr: _win_addr, lose_addr: _lose_addr, win_last_addr: _win_last_addr, current_count: _current_count, count: _count, lose_stop: _lose_stop, finish: _finish };
}

function storeTupleGame(source: Game) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTuplePlayer(source.player1));
    if (source.player2 !== null && source.player2 !== undefined) {
        builder.writeTuple(storeTuplePlayer(source.player2));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.betAmount);
    builder.writeNumber(source.currentBetAmount);
    builder.writeNumber(source.status);
    builder.writeAddress(source.creater);
    builder.writeAddress(source.win_addr);
    builder.writeAddress(source.lose_addr);
    builder.writeAddress(source.win_last_addr);
    builder.writeNumber(source.current_count);
    builder.writeNumber(source.count);
    builder.writeBoolean(source.lose_stop);
    builder.writeBoolean(source.finish);
    return builder.build();
}

function dictValueParserGame(): DictionaryValue<Game> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGame(src)).endCell());
        },
        parse: (src) => {
            return loadGame(src.loadRef().beginParse());
        }
    }
}

export type GameSafe = {
    $$type: 'GameSafe';
    player1: Player;
    player2: Player | null;
    betAmount: bigint;
    currentBetAmount: bigint;
    status: bigint;
    creater: Address;
    win_addr: Address | null;
    lose_addr: Address | null;
    win_last_addr: Address | null;
    current_count: bigint;
    count: bigint;
    lose_stop: boolean;
    finish: boolean;
    roomId: bigint | null;
}

export function storeGameSafe(src: GameSafe) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.store(storePlayer(src.player1));
        if (src.player2 !== null && src.player2 !== undefined) { b_0.storeBit(true); b_0.store(storePlayer(src.player2)); } else { b_0.storeBit(false); }
        b_0.storeUint(src.betAmount, 256);
        let b_1 = new Builder();
        b_1.storeUint(src.currentBetAmount, 256);
        b_1.storeUint(src.status, 256);
        b_1.storeAddress(src.creater);
        let b_2 = new Builder();
        b_2.storeAddress(src.win_addr);
        b_2.storeAddress(src.lose_addr);
        b_2.storeAddress(src.win_last_addr);
        b_2.storeUint(src.current_count, 8);
        b_2.storeUint(src.count, 8);
        b_2.storeBit(src.lose_stop);
        b_2.storeBit(src.finish);
        let b_3 = new Builder();
        if (src.roomId !== null && src.roomId !== undefined) { b_3.storeBit(true).storeInt(src.roomId, 257); } else { b_3.storeBit(false); }
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadGameSafe(slice: Slice) {
    let sc_0 = slice;
    let _player1 = loadPlayer(sc_0);
    let _player2 = sc_0.loadBit() ? loadPlayer(sc_0) : null;
    let _betAmount = sc_0.loadUintBig(256);
    let sc_1 = sc_0.loadRef().beginParse();
    let _currentBetAmount = sc_1.loadUintBig(256);
    let _status = sc_1.loadUintBig(256);
    let _creater = sc_1.loadAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _win_addr = sc_2.loadMaybeAddress();
    let _lose_addr = sc_2.loadMaybeAddress();
    let _win_last_addr = sc_2.loadMaybeAddress();
    let _current_count = sc_2.loadUintBig(8);
    let _count = sc_2.loadUintBig(8);
    let _lose_stop = sc_2.loadBit();
    let _finish = sc_2.loadBit();
    let sc_3 = sc_2.loadRef().beginParse();
    let _roomId = sc_3.loadBit() ? sc_3.loadIntBig(257) : null;
    return { $$type: 'GameSafe' as const, player1: _player1, player2: _player2, betAmount: _betAmount, currentBetAmount: _currentBetAmount, status: _status, creater: _creater, win_addr: _win_addr, lose_addr: _lose_addr, win_last_addr: _win_last_addr, current_count: _current_count, count: _count, lose_stop: _lose_stop, finish: _finish, roomId: _roomId };
}

function loadTupleGameSafe(source: TupleReader) {
    const _player1 = loadTuplePlayer(source.readTuple());
    const _player2_p = source.readTupleOpt();
    const _player2 = _player2_p ? loadTuplePlayer(_player2_p) : null;
    let _betAmount = source.readBigNumber();
    let _currentBetAmount = source.readBigNumber();
    let _status = source.readBigNumber();
    let _creater = source.readAddress();
    let _win_addr = source.readAddressOpt();
    let _lose_addr = source.readAddressOpt();
    let _win_last_addr = source.readAddressOpt();
    let _current_count = source.readBigNumber();
    let _count = source.readBigNumber();
    let _lose_stop = source.readBoolean();
    let _finish = source.readBoolean();
    let _roomId = source.readBigNumberOpt();
    return { $$type: 'GameSafe' as const, player1: _player1, player2: _player2, betAmount: _betAmount, currentBetAmount: _currentBetAmount, status: _status, creater: _creater, win_addr: _win_addr, lose_addr: _lose_addr, win_last_addr: _win_last_addr, current_count: _current_count, count: _count, lose_stop: _lose_stop, finish: _finish, roomId: _roomId };
}

function storeTupleGameSafe(source: GameSafe) {
    let builder = new TupleBuilder();
    builder.writeTuple(storeTuplePlayer(source.player1));
    if (source.player2 !== null && source.player2 !== undefined) {
        builder.writeTuple(storeTuplePlayer(source.player2));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.betAmount);
    builder.writeNumber(source.currentBetAmount);
    builder.writeNumber(source.status);
    builder.writeAddress(source.creater);
    builder.writeAddress(source.win_addr);
    builder.writeAddress(source.lose_addr);
    builder.writeAddress(source.win_last_addr);
    builder.writeNumber(source.current_count);
    builder.writeNumber(source.count);
    builder.writeBoolean(source.lose_stop);
    builder.writeBoolean(source.finish);
    builder.writeNumber(source.roomId);
    return builder.build();
}

function dictValueParserGameSafe(): DictionaryValue<GameSafe> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGameSafe(src)).endCell());
        },
        parse: (src) => {
            return loadGameSafe(src.loadRef().beginParse());
        }
    }
}

export type GameResults = {
    $$type: 'GameResults';
    player1: Address;
}

export function storeGameResults(src: GameResults) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.player1);
    };
}

export function loadGameResults(slice: Slice) {
    let sc_0 = slice;
    let _player1 = sc_0.loadAddress();
    return { $$type: 'GameResults' as const, player1: _player1 };
}

function loadTupleGameResults(source: TupleReader) {
    let _player1 = source.readAddress();
    return { $$type: 'GameResults' as const, player1: _player1 };
}

function storeTupleGameResults(source: GameResults) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.player1);
    return builder.build();
}

function dictValueParserGameResults(): DictionaryValue<GameResults> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGameResults(src)).endCell());
        },
        parse: (src) => {
            return loadGameResults(src.loadRef().beginParse());
        }
    }
}

export type GameListFinish = {
    $$type: 'GameListFinish';
    list: Dictionary<bigint, Game>;
}

export function storeGameListFinish(src: GameListFinish) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(89072877, 32);
        b_0.storeDict(src.list, Dictionary.Keys.BigUint(256), dictValueParserGame());
    };
}

export function loadGameListFinish(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 89072877) { throw Error('Invalid prefix'); }
    let _list = Dictionary.load(Dictionary.Keys.BigUint(256), dictValueParserGame(), sc_0);
    return { $$type: 'GameListFinish' as const, list: _list };
}

function loadTupleGameListFinish(source: TupleReader) {
    let _list = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), dictValueParserGame(), source.readCellOpt());
    return { $$type: 'GameListFinish' as const, list: _list };
}

function storeTupleGameListFinish(source: GameListFinish) {
    let builder = new TupleBuilder();
    builder.writeCell(source.list.size > 0 ? beginCell().storeDictDirect(source.list, Dictionary.Keys.BigUint(256), dictValueParserGame()).endCell() : null);
    return builder.build();
}

function dictValueParserGameListFinish(): DictionaryValue<GameListFinish> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGameListFinish(src)).endCell());
        },
        parse: (src) => {
            return loadGameListFinish(src.loadRef().beginParse());
        }
    }
}

export type GameListActive = {
    $$type: 'GameListActive';
    list: Dictionary<bigint, Game>;
}

export function storeGameListActive(src: GameListActive) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2540337212, 32);
        b_0.storeDict(src.list, Dictionary.Keys.BigUint(256), dictValueParserGame());
    };
}

export function loadGameListActive(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2540337212) { throw Error('Invalid prefix'); }
    let _list = Dictionary.load(Dictionary.Keys.BigUint(256), dictValueParserGame(), sc_0);
    return { $$type: 'GameListActive' as const, list: _list };
}

function loadTupleGameListActive(source: TupleReader) {
    let _list = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), dictValueParserGame(), source.readCellOpt());
    return { $$type: 'GameListActive' as const, list: _list };
}

function storeTupleGameListActive(source: GameListActive) {
    let builder = new TupleBuilder();
    builder.writeCell(source.list.size > 0 ? beginCell().storeDictDirect(source.list, Dictionary.Keys.BigUint(256), dictValueParserGame()).endCell() : null);
    return builder.build();
}

function dictValueParserGameListActive(): DictionaryValue<GameListActive> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGameListActive(src)).endCell());
        },
        parse: (src) => {
            return loadGameListActive(src.loadRef().beginParse());
        }
    }
}

export type GameListWaiting = {
    $$type: 'GameListWaiting';
    list: Dictionary<bigint, Game>;
}

export function storeGameListWaiting(src: GameListWaiting) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3903868703, 32);
        b_0.storeDict(src.list, Dictionary.Keys.BigUint(256), dictValueParserGame());
    };
}

export function loadGameListWaiting(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3903868703) { throw Error('Invalid prefix'); }
    let _list = Dictionary.load(Dictionary.Keys.BigUint(256), dictValueParserGame(), sc_0);
    return { $$type: 'GameListWaiting' as const, list: _list };
}

function loadTupleGameListWaiting(source: TupleReader) {
    let _list = Dictionary.loadDirect(Dictionary.Keys.BigUint(256), dictValueParserGame(), source.readCellOpt());
    return { $$type: 'GameListWaiting' as const, list: _list };
}

function storeTupleGameListWaiting(source: GameListWaiting) {
    let builder = new TupleBuilder();
    builder.writeCell(source.list.size > 0 ? beginCell().storeDictDirect(source.list, Dictionary.Keys.BigUint(256), dictValueParserGame()).endCell() : null);
    return builder.build();
}

function dictValueParserGameListWaiting(): DictionaryValue<GameListWaiting> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGameListWaiting(src)).endCell());
        },
        parse: (src) => {
            return loadGameListWaiting(src.loadRef().beginParse());
        }
    }
}

export type JoinGame = {
    $$type: 'JoinGame';
    gameId: bigint;
    move: bigint;
    count: bigint;
    betAmount: bigint;
}

export function storeJoinGame(src: JoinGame) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3909166337, 32);
        b_0.storeUint(src.gameId, 256);
        b_0.storeUint(src.move, 32);
        b_0.storeUint(src.count, 8);
        b_0.storeUint(src.betAmount, 256);
    };
}

export function loadJoinGame(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3909166337) { throw Error('Invalid prefix'); }
    let _gameId = sc_0.loadUintBig(256);
    let _move = sc_0.loadUintBig(32);
    let _count = sc_0.loadUintBig(8);
    let _betAmount = sc_0.loadUintBig(256);
    return { $$type: 'JoinGame' as const, gameId: _gameId, move: _move, count: _count, betAmount: _betAmount };
}

function loadTupleJoinGame(source: TupleReader) {
    let _gameId = source.readBigNumber();
    let _move = source.readBigNumber();
    let _count = source.readBigNumber();
    let _betAmount = source.readBigNumber();
    return { $$type: 'JoinGame' as const, gameId: _gameId, move: _move, count: _count, betAmount: _betAmount };
}

function storeTupleJoinGame(source: JoinGame) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.gameId);
    builder.writeNumber(source.move);
    builder.writeNumber(source.count);
    builder.writeNumber(source.betAmount);
    return builder.build();
}

function dictValueParserJoinGame(): DictionaryValue<JoinGame> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJoinGame(src)).endCell());
        },
        parse: (src) => {
            return loadJoinGame(src.loadRef().beginParse());
        }
    }
}

export type StopGame = {
    $$type: 'StopGame';
    gameId: bigint;
}

export function storeStopGame(src: StopGame) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3405909699, 32);
        b_0.storeUint(src.gameId, 256);
    };
}

export function loadStopGame(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3405909699) { throw Error('Invalid prefix'); }
    let _gameId = sc_0.loadUintBig(256);
    return { $$type: 'StopGame' as const, gameId: _gameId };
}

function loadTupleStopGame(source: TupleReader) {
    let _gameId = source.readBigNumber();
    return { $$type: 'StopGame' as const, gameId: _gameId };
}

function storeTupleStopGame(source: StopGame) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.gameId);
    return builder.build();
}

function dictValueParserStopGame(): DictionaryValue<StopGame> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStopGame(src)).endCell());
        },
        parse: (src) => {
            return loadStopGame(src.loadRef().beginParse());
        }
    }
}

export type Fee = {
    $$type: 'Fee';
    fee: bigint;
}

export function storeFee(src: Fee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(835112006, 32);
        b_0.storeUint(src.fee, 32);
    };
}

export function loadFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 835112006) { throw Error('Invalid prefix'); }
    let _fee = sc_0.loadUintBig(32);
    return { $$type: 'Fee' as const, fee: _fee };
}

function loadTupleFee(source: TupleReader) {
    let _fee = source.readBigNumber();
    return { $$type: 'Fee' as const, fee: _fee };
}

function storeTupleFee(source: Fee) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.fee);
    return builder.build();
}

function dictValueParserFee(): DictionaryValue<Fee> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFee(src)).endCell());
        },
        parse: (src) => {
            return loadFee(src.loadRef().beginParse());
        }
    }
}

 type SimpleCounter_init_args = {
    $$type: 'SimpleCounter_init_args';
    id: bigint;
}

function initSimpleCounter_init_args(src: SimpleCounter_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
    };
}

async function SimpleCounter_init(id: bigint) {
    const __code = Cell.fromBase64('te6ccgECWAEAErIAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVGNs88uCCUgQFAgEgERID9u2i7fsBkjB/4HAh10nCH5UwINcLH94gghDLAg7Duo6VMNMfAYIQywIOw7ry4IHT/wEx2zx/4CCCEDHGzEa6jhQw0x8BghAxxsxGuvLggdMfATE3f+AgghDpASUBuo6aMNMfAYIQ6QElAbry4IHT/9Mf0wfT/1UwbBTgIAYHCACYyPhDAcx/AcoAVYBQiYEBAc8AUAYg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYUyx8S9AD0AMv/AcjL/xL0ABL0AMkBzMntVAPOgU3cJoEBASNZ9A1voZIwbd8gbpIwbY6H0Ns8bB9vD+Jus/L0JoEBASJZ9A1voZIwbd8gbpIwbY6H0Ns8bB9vD+IgbvLQgG8vWzI0NDY2NjaCALW2+EJSQCFukltwkscF4vL0gQEBbVVVCQPeUwGsIaGBAQv4QihZgwdBM/QKb6GUAdcBMJJbbeJujh2BAQv4QhAocIMHIW6VW1n0WTCYyAHPAUEz9EHiBt6BKDr4QW8kE18DWLry9CmBAQElWfQNb6GSMG3fIG6SMG2Oh9DbPGwfbw/ibuMPQxV/VRMUA+yCEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4CCCEIGdvpm6jrIw0x8BghCBnb6ZuvLggdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEuDAAJEw4w1wDgsMAvogbpIwbY6NIG7y0IBvL8hV4Ns8yeIQPUGAIG6VMFn0WjCUQTP0FeIJpVKlrCqhUqSsUAqhEqGBAQsiIG7y0IAnWYMHQTP0Cm+hlAHXATCSW23iIG7y0ICBAQsDIG7y0IAFqgAioKAQNhSDByFulVtZ9FkwmMgBzwFBM/RB4iYKAIyBAQsnIG7y0IAiWYMHQTP0Cm+hlAHXATCSW23iIG7y0ICBAQsIIG7y0IADoBNHcIMHIW6VW1n0WTCYyAHPAUEz9EHiUAMEAqgQil42EFkQShA5SprbPDdRichZghAyeytKUAPLH8s/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskQeRB4EFcQRhA1RDAS+EIBf23bPH8NDgC++QEggvD3DV15ru6bNKhZQatFeBKaWzKw4XgOnFWH8NrlqgQ72rqdMGxCcG1RMW1DNH/bMeCC8JsOK319wnPQmi97uY9YtiNhghy98ynlUpjAhtu6xEEWupVtMn/bMeAAEvhCUoDHBfLghAE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwPAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ABAAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASAqKwIBIDU2AXr4QlADf21x+EJtbW0kKxCsEJsQigcJcHARE6QREqRV0IEBAREUyFXg2zzJEDhGYCBulTBZ9FowlEEz9BXiJgS4WyeBAQEjWfQNb6GSMG3fIG6SMG2Oh9DbPGwfbw/iIG7y0IBvLziCALxuXbvy9CLAAeMPChESCggRGAgHEREHBhEWBgUREAUEERQEAxETAxAuARESAREVgQEBERhVFRYXA3g1OfhCUA1/bwNyVHyxIG7y0IBvIzAgIG7y0IBSMCFukltwkbrik18EbeMOU4BukjAo4w5T+7qSIW6RcOIYGRoB1FR9yy0gbvLQgG8jggC33vhCJ8cFkX+V+EIkxwXi8vT4QibHBZQzM39zmFsCERICfwJz4gHA/5MCwP+SMnDilDBXEVvjDQgRGAgHERcHBhEWBhEVBBEUBAMREwMKERIKDhERDgUREAVOpRIcATLIVeDbPMlKoCBulTBZ9FowlEEz9BXiF0MwJgCyNyFxIW6SW3CRuuKaU2MhbpJbcJG64pFw4pF/jhhTEyFukltwkbrimiZzIW6SW3CRuuKRcOLikzE1f44ZAXMhbpJbcJG64poFcSFukltwkbrikjVw4uKRBN8ByIEBCyIgbvLQgFYUWYMHQTP0Cm+hlAHXATCSW23iIG7y0ICBAQsjIG7y0IAsqgAToAMRFQMSgwchbpVbWfRZMJjIAc8BQTP0QeKIyIJYwAAAAAAAAAAAAAAAAQHLZ8zJcPsAERIeAqaOzwkRGQkIERgIBxEXBwYRFgYFERUFBBEUBAMREwMCERICARERAVYQVG/zUvBWF1LyVh8BVhkBVh8BVhoBVh8BVh8BVhsBVhgBViQBVicB2zzjDiIbA/pT+7qO9gkRGQkIERgIBxEXBwYRFgYFERUFBBEUBAMREwMCERICARERAVYQVG/zUvBWF1LyVh8BVhkBVh8BVhoBVh8BVh8BVhsBVhgBViQBVicB2zwOpAgRGAgHERcHBhEWBgURFQUEERQEBxETBwIREgIBEREBDhEQUHPjDSMkJQH+OSEgbvLQgFYSASFukltwkbrilDhbPm2OYjdWEHEhbpJbcJG64pogciFukltwkbrikXDikX+OGVYQciFukltwkbrimlMGIW6SW3CRuuKRcOLikzA/f44cJgEREQEhbpJbcJG64poPcSFukltwkbrikj9w4uKSEF7fDhBF4lOAbh0E+JIwKI7kgQELIiBu8tCAVhRZgwdBM/QKb6GUAdcBMJJbbeIgbvLQgIEBCyMgbvLQgCyqABOgAxEVAxKDByFulVtZ9FkwmMgBzwFBM/RB4ojIgljAAAAAAAAAAAAAAAABActnzMlw+wAREuJdupIhbpFw4uMPCBEYCAcRFwceHyAhACYAAAAAd2luZXIgZ290IG1vbmV5AZwJERkJCBEYCAcRFwcGERYGBREVBQQRFAQDERMDAhESAgEREQFWEFRv81Rv8FLwVh8BVh0BVh8BVhoBVh8BVh8BVh8BVh8BVh0BVicB2zwiA/hduo72CREZCQgRGAgHERcHBhEWBgURFQUEERQEAxETAwIREgIBEREBVhBUb/NUb/BS8FYfAVYdAVYfAVYaAVYfAVYfAVYfAVYfAVYdAVYnAds8ERKkCBEYCAcRFwcGERYGBREVBQQRFAQHERMHAhESAgEREQECERBQc+MNIyQlADgGERYGBREVBQQRFAQDERMDAhESAgEREQEREAUOAVY5ORDNEL0QrRCdEI1wVWCBAQEPyFXg2zzJEDgSIG6VMFn0WjCUQTP0FeIFJgFgOTlTkqxwCaAQ3hDOEL4QrhCeVXCBAQEPyFXg2zzJEDgSIG6VMFn0WjCUQTP0FeIFJgAQMDM2IX8RE6UATAgRGAgRExEXERMGERYGBREVBQQRFAQBERMBAhESAgcREQcDERAXAtwQP07cWiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFiJus5d/AcoAEssHlTJwWMoA4soAKG6zljhwUAjKAOMNFsv/BMjL/xPL/wEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIWCcoAIJ/AcoACCBu8tCAbyMQOlog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYibrOXfwHKABLLB5UycFjKAOLKAAH+IG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuJQAyBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiUAMgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4ikAIhbLBxTLBxLKAMoAyVjMyQHMAgEgLC0CASAwMQIRtcG7Z5tnjZIwUi4CFbSi+2eKoRtnjZIwUi8AFoEwZfhCKccF8vQlAWSBMGX4QirHBfL0gQEBJwJZ9A1voZIwbd8gbpIwbY6H0Ns8bB9vD+IgbvLQgG8vEN5fDlUCEbSju2ebZ42SMFIyAhG1k1tnm2eNkjBSMwACJwJYbXGTIMFljyIngQEBIln0DW+hkjBt3yBukjBtjofQ2zxsH28P4m6z4wCk6DBVNALSJ4EBASJZ9A1voZIwbd8gbpIwbY6H0Ns8bB9vD+IgbvLQgG8vPR1wUAxNG07OL21VsFYQbrOfPA8gbvLQgG8jcDJvAwsPklcQ4oEBAREQyBEQVeDbPMkiEDQBIG6VMFn0WjCUQTP0FeIBVUECASA3OAIBIEhJAgEgOToCASA+PwIVsJb2zxVCNs8bJKBSOwIRsbA2zzbPGyRgUjwAUoEBASICWfQNb6GSMG3fIG6SMG2d0IEBAdcA9ARZbBJvAuIgbvLQgG8iAQ74J28Qeds8PQDaIMEBIcJNsfLQhsgiwQCYgC0BywcCowLef3BvAASOGwR6qQwgwABSMLCzm3AzpjAUb4wEpAQDkTDiBOQBs5cCgC5vjAKk3o4QA3qpDKYwE2+MA6QiwAAQNOYzIqUDmlMSb4EBywcCpQLkbCHJ0AIVsb42zxVCNs8bJGBSQAIBakVGAtImgQEBIln0DW+hkjBt3yBukjBtjofQ2zxsH28P4iBu8tCAby89HXBQDE0bTs4vbVWwVhBus588DyBu8tCAbyNwMm8DCw+SVxDiVdBtD4EBARERyBEQVeDbPMkTIG6VMFn0WjCUQTP0FeJVQQLgAxEQA0/tWiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFiJus5d/AcoAEssHlTJwWMoA4soAKW6zljlwUAnKAOMNF8v/BcjL/xTL/1gg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbIWEJDAIJ/AcoACSBu8tCAbyMQO1og10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYibrOXfwHKABLLB5UycFjKAOLKAAH+IG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuJYIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuJQAyBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiE0QAVMsHFssHFMoAEsoAyCJus5p/AcoAEoEBAc8AlTJwWMoA4skBzMlYzMkBzAIPphW2ebZ42SNSRwDbp6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4TsunLVmnZbmdB0s2yjN0UkE4eXO/1fNC9BZyLVaFXYLYpUE4IGc6tPOK/OkoWA6wtxMj2UAAiMCASBKSwIBIExNABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVp2S2ZtelpiS2VxdkJuUE1uckxoRXNuNnhqNGNER1gza3MyNnVxb2daenNHggAhGwRfbPNs8bJGBSTgIBIE9QABaBMGX4QinHBfL0JgIRrCrtnm2eNkjAUlECFa7K7Z4qhG2eNkjAUlMAAiIBzu1E0NQB+GPSAAGORYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH/QE9ATT/9QB0NP/9AT0BDAQORA4EDcQNhA1EDRsGeD4KNcLCoMJuvLgiYEBAdcAAQHR2zxUAXaBMGX4QirHBfL0gQEBJwJZ9A1voZIwbd8gbpIwbY6H0Ns8bB9vD+IgbvLQgG8vEL5fDiBu8tCAbyMwMVUAJIEAw21tbW34QnBUIBcGBVBEAwHi+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAAGS0weSbQHi0gBVIAPSAAGOMPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gABktMHkm0B4tIAVSBvA5Ft4gHT/9QB0NP/0/9WAfb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQw0PpAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIB+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4gFXAHb6QCHXCwHDAI4dASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IiSMW3iAdMH0wfSANIAMBCvEKwQqw==');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSimpleCounter_init_args({ $$type: 'SimpleCounter_init_args', id })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SimpleCounter_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    10298: { message: `sum amount is not true` },
    12389: { message: `no permission` },
    19932: { message: `have to be active room` },
    40368: { message: `Contract stopped` },
    46518: { message: `only lose user can stop` },
    47070: { message: `no entry` },
    48238: { message: `current game is over` },
    53296: { message: `Contract not stopped` },
}

const SimpleCounter_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Player","header":null,"fields":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}},{"name":"choice","type":{"kind":"simple","type":"uint","optional":true,"format":8}},{"name":"ready","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"CountRes","header":null,"fields":[{"name":"roomId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"count","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"player1","type":{"kind":"simple","type":"Player","optional":true}},{"name":"player2","type":{"kind":"simple","type":"Player","optional":true}}]},
    {"name":"CountsRes","header":null,"fields":[{"name":"roomId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"countRes","type":{"kind":"dict","key":"int","value":"CountRes","valueFormat":"ref"}}]},
    {"name":"Game","header":null,"fields":[{"name":"player1","type":{"kind":"simple","type":"Player","optional":false}},{"name":"player2","type":{"kind":"simple","type":"Player","optional":true}},{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"currentBetAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"creater","type":{"kind":"simple","type":"address","optional":false}},{"name":"win_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"lose_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"win_last_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"current_count","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"count","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"lose_stop","type":{"kind":"simple","type":"bool","optional":false}},{"name":"finish","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"GameSafe","header":null,"fields":[{"name":"player1","type":{"kind":"simple","type":"Player","optional":false}},{"name":"player2","type":{"kind":"simple","type":"Player","optional":true}},{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"currentBetAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"status","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"creater","type":{"kind":"simple","type":"address","optional":false}},{"name":"win_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"lose_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"win_last_addr","type":{"kind":"simple","type":"address","optional":true}},{"name":"current_count","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"count","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"lose_stop","type":{"kind":"simple","type":"bool","optional":false}},{"name":"finish","type":{"kind":"simple","type":"bool","optional":false}},{"name":"roomId","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"GameResults","header":null,"fields":[{"name":"player1","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GameListFinish","header":89072877,"fields":[{"name":"list","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"Game","valueFormat":"ref"}}]},
    {"name":"GameListActive","header":2540337212,"fields":[{"name":"list","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"Game","valueFormat":"ref"}}]},
    {"name":"GameListWaiting","header":3903868703,"fields":[{"name":"list","type":{"kind":"dict","key":"uint","keyFormat":256,"value":"Game","valueFormat":"ref"}}]},
    {"name":"JoinGame","header":3909166337,"fields":[{"name":"gameId","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"move","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"count","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"betAmount","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"StopGame","header":3405909699,"fields":[{"name":"gameId","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"Fee","header":835112006,"fields":[{"name":"fee","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const SimpleCounter_getters: ABIGetter[] = [
    {"name":"gameResultByOne","arguments":[{"name":"gameId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"dict","key":"int","value":"GameSafe","valueFormat":"ref"}},
    {"name":"gameListActive","arguments":[],"returnType":{"kind":"dict","key":"int","value":"GameSafe","valueFormat":"ref"}},
    {"name":"gameListActiveUnSafe","arguments":[],"returnType":{"kind":"dict","key":"int","value":"Game","valueFormat":"ref"}},
    {"name":"gamesActiveCounts","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"gamesCounts","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"gamesPlay1Choice","arguments":[{"name":"gameId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"gamesPlay2Choice","arguments":[{"name":"gameId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"gameCountsRes","arguments":[{"name":"gameId","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"CountsRes","optional":false}},
    {"name":"fee","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const SimpleCounter_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"StopGame"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Fee"}},
    {"receiver":"internal","message":{"kind":"text","text":"ResetGame"}},
    {"receiver":"internal","message":{"kind":"text","text":"ResetBalances"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JoinGame"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
]

export default class SimpleCounter implements Contract {
    
    static async init(id: bigint) {
        return await SimpleCounter_init(id);
    }
    
    static async fromInit(id: bigint) {
        const init = await SimpleCounter_init(id);
        const address = contractAddress(0, init);
        return new SimpleCounter(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SimpleCounter(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SimpleCounter_types,
        getters: SimpleCounter_getters,
        receivers: SimpleCounter_receivers,
        errors: SimpleCounter_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: StopGame | Fee | 'ResetGame' | 'ResetBalances' | JoinGame | Deploy | ChangeOwner) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'StopGame') {
            body = beginCell().store(storeStopGame(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Fee') {
            body = beginCell().store(storeFee(message)).endCell();
        }
        if (message === 'ResetGame') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'ResetBalances') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JoinGame') {
            body = beginCell().store(storeJoinGame(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGameResultByOne(provider: ContractProvider, gameId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(gameId);
        let source = (await provider.get('gameResultByOne', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserGameSafe(), source.readCellOpt());
        return result;
    }
    
    async getGameListActive(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('gameListActive', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserGameSafe(), source.readCellOpt());
        return result;
    }
    
    async getGameListActiveUnSafe(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('gameListActiveUnSafe', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserGame(), source.readCellOpt());
        return result;
    }
    
    async getGamesActiveCounts(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('gamesActiveCounts', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGamesCounts(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('gamesCounts', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGamesPlay1Choice(provider: ContractProvider, gameId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(gameId);
        let source = (await provider.get('gamesPlay1Choice', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getGamesPlay2Choice(provider: ContractProvider, gameId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(gameId);
        let source = (await provider.get('gamesPlay2Choice', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getGameCountsRes(provider: ContractProvider, gameId: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(gameId);
        let source = (await provider.get('gameCountsRes', builder.build())).stack;
        const result = loadTupleCountsRes(source);
        return result;
    }
    
    async getFee(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('fee', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}