import { NodeDescribe } from "../../../interface/manager";

export type Connection = {
    fromNode: NodeDescribe;
    toNode: NodeDescribe;
};

export type ConnectionKey = {
    fromNode: string;
    toNode: string;
};

export class GraphDrive {
    topologicalSort(connectList: Connection[]): NodeDescribe[] | undefined {
        const connectionKey = this.mapNCDToKey(connectList);
        const sortedKeys = this.topologicalSortStrings(connectionKey);
        // 如果存在环，返回 undefined
        if (!sortedKeys) {
            return undefined;
        }
        return this.mapKeyToNCD(connectList, sortedKeys);
    }

    private nodeKey(node: NodeDescribe): string {
        return `${node.id}-${node.instanceId}`;
    }

    private mapNCDToKey(connectList: Connection[]): ConnectionKey[] {
        return connectList.map((connection) => ({
            fromNode: this.nodeKey(connection.fromNode),
            toNode: this.nodeKey(connection.toNode)
        }));
    }

    private mapKeyToNCD(connectList: Connection[], sortedKeys: string[]): NodeDescribe[] {
        const nodeMap: { [key: string]: NodeDescribe } = {};
        for (const connection of connectList) {
            nodeMap[this.nodeKey(connection.fromNode)] = connection.fromNode;
            nodeMap[this.nodeKey(connection.toNode)] = connection.toNode;
        }
        // 返回排序后的 NodeConnectDescribe 对象数组
        return sortedKeys.map((key) => nodeMap[key]);
    }

    private topologicalSortStrings(connections: ConnectionKey[]): string[] | undefined {
        const inDegree: { [key: string]: number } = {}; // 节点的入度
        const adjList: { [key: string]: string[] } = {}; // 邻接表
        const sortedOrder: string[] = []; // 拓扑排序结果

        // 初始化入度和邻接表
        for (const connection of connections) {
            const from = connection.fromNode;
            const to = connection.toNode;

            if (!(from in adjList)) {
                adjList[from] = [];
            }
            if (!(to in adjList)) {
                adjList[to] = [];
            }
            adjList[from].push(to);

            if (!(to in inDegree)) {
                inDegree[to] = 0;
            }
            inDegree[to]++;
            if (!(from in inDegree)) {
                inDegree[from] = 0;
            }
        }

        // 查找所有入度为0的节点，加入队列
        const queue: string[] = [];
        for (const node in inDegree) {
            if (inDegree[node] === 0) {
                queue.push(node);
            }
        }

        // 处理队列中的节点
        while (queue.length > 0) {
            const currentNode = queue.shift()!;
            sortedOrder.push(currentNode);

            for (const neighbor of adjList[currentNode]) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) {
                    queue.push(neighbor);
                }
            }
        }

        // 检查是否存在环
        if (sortedOrder.length !== Object.keys(inDegree).length) {
            return undefined;
        }

        return sortedOrder;
    }
}
