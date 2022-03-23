function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function getListNode(arr) {
  let head = new ListNode(arr[0]);
  let p = head;
  for (let i = 1; i < arr.length; i++) {
    p.next = new ListNode(arr[i]);
    p = p.next;
  }
  return head;
}

function bfsListNode(head) {
  let result = [];
  let p = head;
  while (p) {
    result.push(p.val);
    p = p.next;
  }
  console.log(result);
}

module.exports = {
  getListNode,
  bfsListNode,
};
